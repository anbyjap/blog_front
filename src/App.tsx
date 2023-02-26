import { Top } from './pages/Top/Top'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import '../scss/__color.scss'
import React from 'react'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}
