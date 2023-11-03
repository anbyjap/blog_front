import { SyntheticEvent } from 'react';
import { useQuery } from 'react-query';
import { Box, Tabs, Tab } from '@mui/material';
import './Search.scss';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { GlobalProps, PostCard, Tag } from '../../types/types';
import { TagButton } from '../../components/TagButton/TagButton';
import { fetchAllPost, fetchAllTags } from '../../api';
import { LoadingSpinner } from '../../components/Loading';
import { useAppContext } from '../../AppContext';

const categoryList = ['tech', 'idea'];

export const Search = () => {
  const { keyword, setKeyword, tabIndex, setTabIndex, tagId, setTagId } = useAppContext();

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<PostCard[]>(
    ['allPosts', tabIndex, keyword, tagId],
    () =>
      fetchAllPost({
        keyword: keyword,
        tagId: tagId,
        tabIndex: tabIndex,
        categoryList,
      }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  const {
    isLoading: isTagLoading,
    error: tagError,
    data: tagData,
  } = useQuery<Tag>(['tag', tagId], () => fetchAllTags({ tagId: tagId }), {
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setKeyword();
    setTagId();
    setTabIndex(Number(value));
  };

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
          <div className='search-result'>
            {keyword && <h2 style={{ margin: 0 }}>Search Results for: {keyword}</h2>}
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {tagId && !isTagLoading && tagData && <TagButton disable {...tagData} />}
                <div className='grid-system'>
                  {allPosts && allPosts?.length > 0 ? (
                    allPosts.map((PostCard) => <ContentCard {...PostCard} key={PostCard.post_id} />)
                  ) : (
                    <h1>There is no centents to show.</h1>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
