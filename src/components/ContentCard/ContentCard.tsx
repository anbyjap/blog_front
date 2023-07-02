import React from 'react'
import { Card } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import { BiTimeFive } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface props {
  content: {
    icon: string
    title: string
    author: string
    postAt: Date
  }
}

export const ContentCard = (props: props) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        ':hover': {
          boxShadow: 20, // theme.shadows[20]
        },
      }}
      style={{ display: 'flex', width: 400, height: 190 }}
    >
      <ButtonBase onClick={() => navigate('/top')}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, padding: 30 }}>😄</div>
        <div
          style={{
            overflowWrap: 'break-word',
            height: '50%',
            width: '55%',
            backgroundColor: '#d9d9d9',
            alignSelf: 'center',
            padding: 30,
            borderRadius: 30,
          }}
        >
          <p className='title'>{props.content.title}</p>
          <div className='time-and-user'>
            <div className='to-read'>
              <BiTimeFive />
              <p>{props.content.postAt.getFullYear()}</p>
            </div>
            <div className='to-read'>
              <FaUserAlt />
              <p>{props.content.author}</p>
            </div>
          </div>
        </div>
      </ButtonBase>
    </Card>
  )
}
