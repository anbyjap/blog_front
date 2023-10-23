// import React from 'react'
import { Box } from '@mui/system';
import { BiTimeFive } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import './ContentTitleCard.scss';

interface props {
  title: string;
  username: string;
}

export const ContentTitleCard = (props: props) => {
  return (
    <Box className='title-content-wrapper'>
      <Box className='title-content'>
        <h1>😀</h1>
        <div className='title-detail'>
          <h1>{props.title}</h1>
          <div className='time-and-user'>
            <div className='to-read'>
              <BiTimeFive />
              <p>10 minutes</p>
            </div>
            <div className='to-read'>
              <FaUserAlt />
              <p>{props.username}</p>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
