// import React from 'react'
import { Box } from '@mui/system';
import './BlogContent.scss';
import ReactMarkdown from 'react-markdown';
import { TagButton } from '../TagButton/TagButton';
import { PostContent } from '../../types/types';
import { TitleList } from '../TitleList';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppContext } from '../../AppContext';

const renderers = {
  //This custom renderer changes how images are rendered
  //we use it to constrain the max width of an image to its container
  image: ({ alt, src, title }: { alt?: string; src?: string; title?: string }) => (
    <img alt={alt} src={src} title={title} style={{ maxWidth: 475 }} />
  ),
};

export const BlogContent = (props: PostContent) => {
  const { handleTagClick } = useAppContext();

  return (
    <Box className='blog-content-wrapper'>
      <div className='blog-main'>
        <Box className='taglist'>
          {props.tag_urls?.map((tag) => (
            <TagButton key={tag.tag_id} {...tag} handleTagClick={handleTagClick} />
          ))}
        </Box>
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag='div'
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
            img: ({ node, ...props }) => <img style={{ maxWidth: '100%' }} {...props} />,

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
