import { Top } from './pages/Top/Top';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './scss/__color.scss';
import './App.scss';
import { Search } from './pages/Search/Search';
import { SearchAppBar } from './components/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

export const App = () => {
  const [keyword, setKeyword] = useState<string>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tagId, setTagId] = useState<string>();

  const [postContent, setPostContent] = useState<string>();

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
              postContent={postContent}
            />
          </div>
          <div className='content'>
            <Routes>
              <Route
                path='/post/:username/:slug'
                element={<Top setPostContent={setPostContent} handleTagClick={handleTagClick} />}
              />
              <Route
                path='/'
                element={
                  <Search
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
