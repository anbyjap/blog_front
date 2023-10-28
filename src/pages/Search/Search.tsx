import { SyntheticEvent } from 'react';
import { useQuery } from 'react-query';
import { Box, Tabs, Tab } from '@mui/material';
import './Search.scss';
import { ContentCard } from '../../components/ContentCard/ContentCard';
import { GlobalProps, PostCard, Tag } from '../../types/types';
import { TagButton } from '../../components/TagButton/TagButton';
import { fetchAllPost, fetchAllTags } from '../../api';
import { LoadingSpinner } from '../../components/Loading';

const categoryList = ['tech', 'idea'];

export const Search = (props: GlobalProps) => {
  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<PostCard[]>(
    ['allPosts', props.tabIndex, props.keyword, props.tagId],
    () =>
      fetchAllPost({
        keyword: props.keyword,
        tagId: props.tagId,
        tabIndex: props.tabIndex,
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
  } = useQuery<Tag>(['tag', props.tagId], () => fetchAllTags({ tagId: props.tagId }), {
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {props.tagId && !isTagLoading && tagData && <TagButton disable {...tagData} />}
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
