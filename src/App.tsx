import { Top } from './pages/Top/Top'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import '../scss/__color.scss'
import React from 'react'
import { Search } from './pages/Search/Search'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/top' element={<Top />} />
        <Route path='/' element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}
