// import React from 'react'
import { Card } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { BiTimeFive } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../../types/types';

function daysAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffTime = Math.abs(now.getTime() - then.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return '1 day ago';
  } else {
    return `${diffDays} days ago`;
  }
}

export const ContentCard = (props: PostCard) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        ':hover': {
          boxShadow: 20, // theme.shadows[20]
        },
      }}
      style={{ display: 'flex', minWidth: '100%', minHeight: 190 }}
    >
      <ButtonBase
        style={{ width: '100%' }}
        onClick={() => {
          navigate(`/post/${props.username}/${props.slug}`);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, padding: 30 }}>
          {props.emoji}
        </div>
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
              <p>{daysAgo(new Date(props.created_at))}</p>
            </div>
            <div className='to-read'>
              <FaUserAlt />
              <p>{props.username}</p>
            </div>
          </div>
        </div>
      </ButtonBase>
    </Card>
  );
};
