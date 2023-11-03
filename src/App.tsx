import { Top } from './pages/Top/Top';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './scss/__color.scss';
import './App.scss';
import { Search } from './pages/Search/Search';
import { SearchAppBar } from './components/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from './components/Footer/Footer';
import { AppProvider } from './AppContext';
import { Editor } from './pages/Editor/Editor';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login/Login';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

export const App = () => (
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <div className='app-container'>
            <div className='header'>
              <SearchAppBar />
            </div>
            <div className='content'>
              <Routes>
                <Route path='/post/:username/:slug' element={<Top />} />
                <Route path='/' element={<Search />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/editor'
                  element={
                    <ProtectedRoute>
                      <Editor />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <div className='footer'>
                <Footer />
              </div>
            </div>
          </div>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </CookiesProvider>
);
