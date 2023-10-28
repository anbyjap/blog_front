// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import ReactMarkdown from 'react-markdown';
import { TagButton } from '../TagButton/TagButton';
import { PostContent } from '../../types/types';
import { TitleList } from '../TitleList';

interface props extends PostContent {
  handleTagClick: (value: string) => void;
}

export const BlogContent = (props: props) => {
  return (
    <Box className='blog-content-wrapper'>
      <div className='blog-main'>
        <Box className='taglist'>
          {props.tag_urls?.map((tag) => (
            <TagButton key={tag.tag_id} {...tag} handleTagClick={props.handleTagClick} />
          ))}
        </Box>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 id={children[0]?.toString()}>{children[0]}</h1>,
          }}
          className='markdown-content'
        >
          {props.content}
        </ReactMarkdown>
      </div>
      <Box className='title-list'>
        <TitleList content={props.content} />
      </Box>
    </Box>
  );
};
