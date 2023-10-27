// import React from 'react'
import { useLocation } from 'react-router-dom';
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard';
import './Top.scss';
import { BlogContent } from '../../components/BlogContent/BlogContent';
import { useQuery } from 'react-query';
import { Post } from '../../types/types';
import { fetchAllPost } from '../../api';

interface props {
  keyword?: string;
  tagId: string;
  tabIndex?: number;
  currentPost: Post;
  handleTagClick: (a: string) => void;
}

const categoryList = ['tech', 'idea'];

export const Top = (props: props) => {
  const apiURL = import.meta.env.VITE_API_URL;

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<Post[]>(
    ['allPosts', props.tabIndex, props.keyword, props.tagId],
    () =>
      fetchAllPost({
        apiURL, // Ensure this is defined somewhere in your component
        keyword: props.keyword,
        tagId: props.tagId,
        tabIndex: props.tabIndex,
        categoryList, // Ensure this is defined somewhere in your component
      }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );
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
