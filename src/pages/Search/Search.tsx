import { useState, SyntheticEvent, useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { Box, Tabs, Tab } from '@mui/material';
import './Search.scss';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { GlobalProps, Post, Tag } from '../../types/types';
import { TagButton } from '../../components/TagButton/TagButton';

const categoryList = ['tech', 'idea'];

export const Search = (props: GlobalProps) => {
  const apiURL = import.meta.env.VITE_API_URL;

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<Post[]>(
    ['allPosts', props.tabIndex, props.keyword, props.tagId],
    () => {
      let url = `${apiURL}/posts/?`;

      if (props.keyword) {
        url = `${url}keyword=${props.keyword}`;
      } else if (props.tagId) {
        url = `${url}tag_id=${props.tagId}`;
      } else {
        url = `${url}category=${categoryList[props.tabIndex ? props.tabIndex : 0]}`;
      }

      return fetch(url)
        .then((res) => res.json())
        .then((data: Post[]) => data);
    },
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  const {
    isLoading: isTagLoading,
    error: tagError,
    data: tagData,
  } = useQuery<Tag>(
    ['tag', props.tagId],
    () =>
      fetch(`${apiURL}/tags/${props.tagId}`)
        .then((res) => res.json())
        .then((data: Tag) => data),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  console.log(tagData);

  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    props.setKeyword();
    props.setTagId();
    props.setTabIndex(Number(value));
  };

  return (
    <div className='top-wrapper'>
      <div className='title-content-card'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            TabIndicatorProps={{ style: { background: 'black' } }}
            textColor='inherit'
            sx={{ fontWeight: '900' }}
            value={props.tabIndex}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Tech' />
            <Tab label='Ideas' />
          </Tabs>
        </Box>
        <div className='content-card-list'>
          {props.keyword && <h2 style={{ margin: 0 }}>Search Results for: {props.keyword}</h2>}
          <div className='search-result'>
            {props.tagId && !isTagLoading && tagData && <TagButton disable {...tagData} />}

            <div className='grid-system'>
              {isLoading ? (
                <h1>Loading....</h1>
              ) : allPosts && allPosts?.length > 0 ? (
                allPosts.map((post) => <ContentCard {...post} key={post.post_id} />)
              ) : (
                <h1>There is no centents to show.</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
