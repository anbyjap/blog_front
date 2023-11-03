import { Button } from '@mui/material';
import { Tag } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import './TagButton.scss';
import { useAppContext } from '../../AppContext';

interface TagProps extends Tag {
  handleTagClick?: (value: string) => void;
  disable?: boolean;
}

export const TagButton = (props: TagProps) => {
  const navigation = useNavigate();
  const { setPostContent } = useAppContext();

  return (
    <Button
      key={props.tag_name}
      className='tag'
      startIcon={<img alt={props.tag_name} src={props.url} style={{ width: 25, height: 25 }} />}
      onClick={() => {
        props.handleTagClick && props.handleTagClick(props.tag_id);
        setPostContent('');
        navigation('/');
      }}
      disabled={props.disable}
    >
      {props.tag_name}
    </Button>
  );
};
