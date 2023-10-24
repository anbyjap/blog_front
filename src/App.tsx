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
            />
          </div>
          <div className='content'>
            <Routes>
              <Route path='/top' element={<Top />} />
              <Route
                path='/'
                element={
                  <Search
                    keyword={keyword}
                    setKeyword={setKeyword}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
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
