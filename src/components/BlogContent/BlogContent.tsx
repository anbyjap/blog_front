// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import ReactMarkdown from 'react-markdown';
import { TagButton } from '../TagButton/TagButton';
import { Post } from '../../types/types';

interface props {
  currentPost: Post;
  handleTagClick: (value: string) => void;
}

const makeTitleShoter = (title: string): string => {
  if (title.length > 10) {
    return `${title.slice(0, 10)}...`;
  }
  return title;
};

export const BlogContent = (props: props) => {
  return (
    <Box className='blog-content-wrapper'>
      <div className='blog-main'>
        <Box className='taglist'>
          {props.currentPost.tag_urls?.map((tag) => (
            <TagButton key={tag.tag_id} {...tag} handleTagClick={props.handleTagClick} />
          ))}
        </Box>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 id={children[0]?.toString()}>{children[0]}</h1>,
          }}
        >
          {props.currentPost.content}
        </ReactMarkdown>
      </div>
      <Box className='title-list'>
        {props.currentPost.content
          .split('\n')
          .filter((line) => line.startsWith('#'))
          .map((title, index) => (
            <li key={index}>
              <a href={`/top#${title.replace('# ', '')}`}>
                {makeTitleShoter(title.replace('# ', ''))}
              </a>
            </li>
          ))}
      </Box>
    </Box>
  );
};
