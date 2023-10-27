// import React from 'react'
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard';
import './Top.scss';
import { BlogContent } from '../../components/BlogContent/BlogContent';
import { Post } from '../../types/types';

interface props {
  keyword?: string;
  tagId: string;
  tabIndex?: number;
  currentPost: Post;
  handleTagClick: (a: string) => void;
}

export const Top = (props: props) => {
  return (
    <div className='top-wrapper'>
      <div className='title-content-card'>
        <ContentTitleCard username={props.currentPost.username} title={props.currentPost.title} />
      </div>
      <div>
        <BlogContent currentPost={props.currentPost} handleTagClick={props.handleTagClick} />
      </div>
    </div>
  );
};
