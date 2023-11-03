import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
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
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Tag } from '../../types/types';
import { fetchAllMasterTags } from '../../api';
import { LoadingSpinner } from '../../components/Loading';

export const Editor = () => {
  const [value, setValue] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const {
    isLoading,
    error,
    data: allTags,
  } = useQuery<Tag[]>(['allTags'], fetchAllMasterTags, {
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  const { mutate, isLoading: isPostDone } = useMutation(, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl style={{ height: '80svh', width: '90%', padding: '30px 0' }}>
        <FormLabel id='Title'>Title</FormLabel>
        <TextField required id='outlined-required' />
        <FormLabel id='demo-radio-buttons-group-label'>Category</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='tech'
          name='radio-buttons-group'
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value='tech' control={<Radio />} label='tech' />
          <FormControlLabel value='idea' control={<Radio />} label='idea' />
        </RadioGroup>
        <FormLabel id='select-tags'>Tags</FormLabel>
        <Select
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
        <MDEditor height='90%' value={value} onChange={setValue} data-color-mode='light' />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button size='large' variant='contained'>
            Submit
          </Button>
        </div>
      </FormControl>
    </div>
  );
};
