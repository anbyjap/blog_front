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
import { SyntheticEvent, useState } from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { PostCreate, Tag } from '../../types/types';
import { fetchAllMasterTags, postBlog } from '../../api';
import { LoadingSpinner } from '../../components/Loading';

export const Editor = () => {
  const [emoji, setEmoji] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState('tech');
  const [content, setContent] = useState<string>();
  const [selectedTags, setSelectedTags] = useState([]);
  const {
    isLoading,
    error,
    data: allTags,
  } = useQuery<Tag[]>(['allTags'], fetchAllMasterTags, {
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
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
    if (title && content && category && selectedTags.length > 0 && emoji) {
      const slug = title.replaceAll(' ', '-');
      const postContent: PostCreate = {
        userId: 'aaa',
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={onSubmit}>
        <FormControl style={{ height: '80svh', width: '90%', padding: '30px 0' }}>
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
          <MDEditor
            aria-required
            height='90%'
            value={content}
            onChange={setContent}
            data-color-mode='light'
          />
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
