// import React from 'react'
import { useLocation } from 'react-router-dom';
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard';
import './Top.scss';
import { BlogContent } from '../../components/BlogContent/BlogContent';

export const Top = () => {
  const location = useLocation();
  const postData = location.state?.post;
  return (
    <div className='top-wrapper'>
      <div className='title-content-card'>
        <ContentTitleCard username={postData.username} title={postData.title} />
      </div>
      <div>
        <BlogContent tag_urls={postData.tag_urls} content={postData.content} />
      </div>
    </div>
  );
};
