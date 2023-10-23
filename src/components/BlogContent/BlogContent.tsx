// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import { Avatar, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface tag {
  url: string;
  tag_name: string;
}

interface props {
  tag_urls: tag[] | null;
  content: string;
}

export const BlogContent = (props: props) => {
  return (
    <Box className='blog-content-wrapper'>
      <div className='blog-main'>
        <Box className='taglist'>
          {props.tag_urls?.map((tag) => (
            <Button
              key={tag.tag_name}
              className='tag'
              startIcon={<img alt={tag.tag_name} src={tag.url} style={{ width: 30, height: 30 }} />}
            >
              {tag.tag_name}
            </Button>
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
          .map((title, index) => (
            <li key={index}>
              <a href={`#${title.replace('# ', '')}`}>{title.replace('# ', '')}</a>
            </li>
          ))}
      </Box>
    </Box>
  );
};
