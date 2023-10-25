// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import ReactMarkdown from 'react-markdown';
import { TagButton } from '../TagButton/TagButton';

interface tag {
  tag_id: string;
  url: string;
  tag_name: string;
}

interface props {
  tag_urls: tag[] | null;
  content: string;
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
