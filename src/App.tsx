import { Top } from './pages/Top/Top'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './scss/__color.scss'
import './App.scss'
import { Search } from './pages/Search/Search'
import { SearchAppBar } from './components/Header/Header'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='app-container'>
          <div className='header'>
            <SearchAppBar />
          </div>
          <div className='content'>
            <Routes>
              <Route path='/top' element={<Top />} />
              <Route path='/' element={<Search />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
