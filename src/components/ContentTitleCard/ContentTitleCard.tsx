import React from 'react'
import { Box } from '@mui/system'
import './ContentTitleCard.scss'

export const ContentTitleCard = () => {
  return (
    <Box className='title-content-wrapper'>
      <Box className='title-content'>
        <h1 className='title-icon'>😀</h1>
        <div className='title-detail'></div>
      </Box>
    </Box>
  )
}
