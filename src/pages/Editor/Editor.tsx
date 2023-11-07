import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
// import dynamic from 'next/dynamic';
import { SetStateAction, SyntheticEvent, useState } from 'react';
import { UseMutateFunction, useMutation, useQuery } from 'react-query';
import { PostCreate, Tag } from '../../types/types';
import { fetchAllMasterTags, postBlog, uploadImage } from '../../api';
import { LoadingSpinner } from '../../components/Loading';
import { useCookies } from 'react-cookie';

const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = image;

      // Calculate the new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(
              new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              }),
            );
          } else {
            reject(new Error('Canvas to Blob returned null'));
          }
        }, 'image/jpeg');
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    image.onerror = (errorEvent) => {
      reject(errorEvent);
    };
  });
};

const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

interface uploadProps {
  file: File; // Assuming you're uploading a single file
  token: string;
}

const onImagePasted = async (
  dataTransfer: DataTransfer,
  token: string,
  postimage: UseMutateFunction<any, unknown, uploadProps, unknown>,
): Promise<void> => {
  // This will hold all the promises returned by resizeImage function
  const resizePromises: Promise<File>[] = [];

  // Iterate through the files in the DataTransfer object
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);
    if (file) {
      // resizeImage returns a promise so we push it to our array
      resizePromises.push(resizeImage(file, 800, 800));
    }
  }

  try {
    // Wait for all the resizeImage promises to resolve
    const resizedFiles = await Promise.all(resizePromises);

    // Upload all the resized files
    await Promise.all(
      resizedFiles.map(async (file) => {
        await postimage({ file, token });
      }),
    );
  } catch (error) {
    console.error('Error resizing or uploading files:', error);
    // Handle the error appropriately
  }
};

export const Editor = () => {
  const [emoji, setEmoji] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState('tech');
  const [content, setContent] = useState<string>();
  const [selectedTags, setSelectedTags] = useState([]);
  const [cookies] = useCookies(['yenn_token']);
  const token = cookies.yenn_token;

  const {
    isLoading,
    error,
    data: allTags,
  } = useQuery<Tag[]>(['allTags'], fetchAllMasterTags, {
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  const {
    mutate: postImage,
    isLoading: isPostLoading,
    error: imageError,
  } = useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log(data);
      const insertedMarkdown = insertToTextArea(`![](${data.url})`);
      if (!insertedMarkdown) {
        return;
      }
      setContent(insertedMarkdown);
    },
    // You might want to handle the error state as well
    onError: (error) => {
      // Handle the error here
      console.error('Delete failed:', error);
      alert('upload failed');
    },
  });

  const { mutate, isLoading: isPostDone } = useMutation(postBlog, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    // onSettled: () => {
    //   QueryClient.invalidateQueries('create');
    // },
  });

  const onSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (title && content && category && selectedTags.length > 0 && emoji && cookies.yenn_token) {
      const slug = title.replaceAll(' ', '-');
      // TODO : do not use token on body just params
      const postContent: PostCreate = {
        token: cookies.yenn_token,
        title,
        content,
        category,
        tags: selectedTags,
        slug,
        emoji,
      };
      mutate(postContent);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <form onSubmit={onSubmit} style={{ height: '80svh', width: '80%', padding: '30px 0' }}>
        <FormControl style={{ height: '100%', width: '100%' }}>
          <FormLabel id='Title'>Emoji</FormLabel>
          <TextField required id='emoji' value={emoji} onChange={(e) => setEmoji(e.target.value)} />
          <FormLabel id='Emoji'>Title</FormLabel>
          <TextField
            required
            id='outlined-required'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormLabel id='demo-radio-buttons-group-label'>Category</FormLabel>
          <RadioGroup
            aria-required
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='tech'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name='radio-buttons-group'
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel value='tech' control={<Radio />} label='tech' />
            <FormControlLabel value='idea' control={<Radio />} label='idea' />
          </RadioGroup>
          <FormLabel id='select-tags'>Tags</FormLabel>
          <Select
            required
            multiple
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            input={<OutlinedInput />}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              allTags &&
              allTags.map((tag) => (
                <MenuItem key={tag.tag_id} value={tag.tag_name}>
                  {tag.tag_name}
                </MenuItem>
              ))
            )}
          </Select>
          {isPostLoading ? (
            <LoadingSpinner />
          ) : (
            <MDEditor
              aria-required
              height='90%'
              value={content}
              onChange={setContent}
              data-color-mode='light'
              onPaste={async (event) => {
                event.preventDefault();
                await onImagePasted(event.clipboardData, token, postImage);
              }}
              onDrop={async (event) => {
                event.preventDefault();
                await onImagePasted(event.dataTransfer, token, postImage);
              }}
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button type='submit' size='large' variant='contained'>
              Submit
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};
