// import React from 'react'
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard';
import './Top.scss';
import { BlogContent } from '../../components/BlogContent/BlogContent';
import { PostContent } from '../../types/types';
import { useQuery } from 'react-query';
import { fetchPost } from '../../api';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/Loading';
import { useAppContext } from '../../AppContext';

export const Top = () => {
  const { username, slug } = useParams(); // Access path parameters

  const { setPostContent } = useAppContext();

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
        setPostContent: setPostContent,
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
              <ContentTitleCard
                created_at={postContentData.created_at}
                emoji={postContentData.emoji}
                username={postContentData.username}
                title={postContentData.title}
              />
            </div>
            <div>
              <BlogContent {...postContentData} />
            </div>
          </>
        )
      )}
    </div>
  );
};
