import React from 'react'
import { Box } from '@mui/system'
import './BlogContent.scss'
import { Avatar, Button } from '@mui/material'

export const BlogContent = () => {
  return (
    <Box className='blog-content-wrapper'>
      <Box className='taglist'>
        {Array(10)
          .fill(0)
          .map((key) => (
            <Button
              key={key}
              className='tag'
              startIcon={
                <Avatar
                  src={
                    'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png'
                  }
                />
              }
            >
              aaa
            </Button>
          ))}
      </Box>
    </Box>
  )
}
