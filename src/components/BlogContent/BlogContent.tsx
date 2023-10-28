// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import ReactMarkdown from 'react-markdown';
import { TagButton } from '../TagButton/TagButton';
import { PostContent } from '../../types/types';

interface props extends PostContent {
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
          {props.tag_urls?.map((tag) => (
            <TagButton key={tag.tag_id} {...tag} handleTagClick={props.handleTagClick} />
          ))}
        </Box>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 id={children[0]?.toString()}>{children[0]}</h1>,
          }}
        >
          {props.content}
        </ReactMarkdown>
      </div>
      <Box className='title-list'>
        {props.content
          .split('\n')
          .filter((line) => line.startsWith('#'))
          .map((title, index) => {
            // Create a new URL based on the current location
            const currentUrl = new URL(window.location.href);
            // Modify the hash part of the URL
            currentUrl.hash = title.replace('# ', '');
            return (
              <li key={index}>
                <a href={currentUrl.href}>{makeTitleShoter(title.replace('# ', ''))}</a>
              </li>
            );
          })}
      </Box>
    </Box>
  );
};
