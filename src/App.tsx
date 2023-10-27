import { Top } from './pages/Top/Top';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './scss/__color.scss';
import './App.scss';
import { Search } from './pages/Search/Search';
import { SearchAppBar } from './components/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { Post } from './types/types';

const queryClient = new QueryClient();

export const App = () => {
  const [keyword, setKeyword] = useState<string>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tagId, setTagId] = useState<string>();
  const [currentPost, setCurrentPost] = useState<Post>();

  const handleTagClick = (tagId: string) => {
    console.log(tagId);
    setKeyword(undefined);
    setTabIndex(-1);
    setTagId(tagId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='app-container'>
          <div className='header'>
            <SearchAppBar
              keyword={keyword}
              setKeyword={setKeyword}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              tagId={tagId}
              setTagId={setTagId}
            />
          </div>
          <div className='content'>
            <Routes>
              <Route
                path='/top'
                element={<Top currentPost={currentPost} handleTagClick={handleTagClick} />}
              />
              <Route
                path='/'
                element={
                  <Search
                    setCurrentPost={setCurrentPost}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    tagId={tagId}
                    setTagId={setTagId}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
