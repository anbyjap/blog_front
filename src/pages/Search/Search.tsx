import { useState, SyntheticEvent, useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';
import { Box, Tabs, Tab } from '@mui/material';
import './Search.scss';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { GlobalProps, Post } from '../../types/types';

const categoryList = ['tech', 'idea'];

export const Search = (props: GlobalProps) => {
  const apiURL = import.meta.env.VITE_API_URL;

  const {
    isLoading,
    error,
    data: allPosts,
    refetch,
  } = useQuery<Post[]>(
    ['allPosts', props.tabIndex, props.keyword],
    () => {
      // Construct the URL considering both category and keyword
      const url = `${apiURL}/posts/?${
        props.keyword
          ? `keyword=${props.keyword}`
          : `category=${categoryList[props.tabIndex ? props.tabIndex : 0]}`
      }`;

      return fetch(url)
        .then((res) => res.json())
        .then((data: Post[]) => data);
    },
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    props.setKeyword();
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
          <div className='grid-system'>
            {isLoading ? (
              <h1>Loading....</h1>
            ) : allPosts && allPosts?.length > 0 ? (
              allPosts?.map((post, key) => <ContentCard {...post} key={key} />)
            ) : (
              <h1>There is no centents to show.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
