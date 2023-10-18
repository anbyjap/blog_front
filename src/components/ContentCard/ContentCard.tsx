// import React from 'react'
import { Card } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import { BiTimeFive } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../types/types'

export const ContentCard = (props: Post) => {
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
      <ButtonBase style={{ width: '100%' }} onClick={() => navigate('/top')}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, padding: 30 }}>😄</div>
        <div
          style={{
            overflowWrap: 'break-word',
            height: '80%',
            width: '70%',
            backgroundColor: '#d9d9d9',
            alignSelf: 'center',
            borderRadius: 30,
          }}
        >
          <div
            style={{
              height: '70%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className='title'>{props.title}</p>
          </div>

          <div className='time-and-user'>
            <div className='to-read'>
              <BiTimeFive />
              <p>{new Date(props.published_at).getFullYear()}</p>
            </div>
            <div className='to-read'>
              <FaUserAlt />
              <p>{props.user_id}</p>
            </div>
          </div>
        </div>
      </ButtonBase>
    </Card>
  )
}
