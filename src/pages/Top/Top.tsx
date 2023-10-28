// import React from 'react'
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard';
import './Top.scss';
import { BlogContent } from '../../components/BlogContent/BlogContent';
import { PostContent } from '../../types/types';
import { useQuery } from 'react-query';
import { fetchPost } from '../../api';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { LoadingSpinner } from '../../components/Loading';

interface props {
  handleTagClick: (a: string) => void;
}

export const Top = (props: props) => {
  const { username, slug } = useParams(); // Access path parameters

  const {
    isLoading,
    error,
    data: postContentData,
  } = useQuery<PostContent>(
    ['post', username, slug],
    () =>
      fetchPost({
        username: username ? username : '',
        slug: slug ? slug : '',
      }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );
  return (
    <div className='top-wrapper'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        postContentData && (
          <>
            <div className='title-content-card'>
              <ContentTitleCard username={postContentData.username} title={postContentData.title} />
            </div>
            <div>
              <BlogContent {...postContentData} handleTagClick={props.handleTagClick} />
            </div>
          </>
        )
      )}
    </div>
  );
};
