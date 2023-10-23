import { useState, SyntheticEvent, useContext } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Box, Tabs, Tab } from '@mui/material';
import './Search.scss';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { useLocation } from 'react-router-dom';
import { Post } from '../../types/types';

export const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const apiURL = import.meta.env.VITE_API_URL;

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setTabIndex(Number(value));
  };

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<Post[]>(
    'allPosts',
    () =>
      fetch(`${apiURL}/posts/`)
        .then((res) => res.json())
        .then((data: Post[]) => data),
    {
      // Example: Invalidate query when someData changes
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      // refetchOnMount: false, // Disable automatic refetch on component mount
      // refetchOnReconnect: false, // Disable automatic refetch on network reconnect
      // Add other query options as needed
    },
  );

  console.log(allPosts);

  return (
    <div className='top-wrapper'>
      <div className='title-content-card'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            TabIndicatorProps={{ style: { background: 'black' } }}
            textColor='inherit'
            sx={{ fontWeight: '900' }}
            value={tabIndex}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Tech' />
            <Tab label='Ideas' />
          </Tabs>
        </Box>
        <div className='content-card-list'>
          {query && <h2 style={{ margin: 0 }}>Search Results for: {query}</h2>}
          <div className='grid-system'>
            {isLoading ? (
              <h1>Loading....</h1>
            ) : tabIndex === 0 ? (
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
