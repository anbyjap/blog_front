// import React from 'react'
import { Box } from '@mui/system';
import { BiTimeFive } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import './ContentTitleCard.scss';

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

interface props {
  title: string;
  username: string;
  created_at: string;
  emoji: string;
}

export const ContentTitleCard = (props: props) => {
  return (
    <Box className='title-content-wrapper'>
      <Box className='title-content'>
        <h1>{props.emoji}</h1>
        <div className='title-detail'>
          <h1>{props?.title}</h1>
          <div className='time-and-user'>
            <div className='to-read'>
              <BiTimeFive />
              <p>{daysAgo(new Date(props.created_at))}</p>
            </div>
            <div className='to-read'>
              <FaUserAlt />
              <p>{props?.username}</p>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
