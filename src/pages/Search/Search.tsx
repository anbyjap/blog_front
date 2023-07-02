import React, { useState, SyntheticEvent } from 'react'
import { Box, Tabs, Tab, Card } from '@mui/material'
import { SearchAppBar } from '../../components/Header/Header'
import './Search.scss'
import { BiTimeFive } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { ContentCard } from '../../components/ContentCard/ContentCard'

export const Search = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setTabIndex(Number(value))
  }

  const contentList = [
    {
      icon: 'aaa',
      title: 'dsadsdasdsadasdsadas',
      author: 'aaaaa',
      postAt: new Date(),
    },
    {
      icon: 'aaa',
      title: 'dsadsdasdsadasdsadas',
      author: 'aaaaa',
      postAt: new Date(),
    },
    {
      icon: 'aaa',
      title: 'dsadsdasdsadasdsadas',
      author: 'aaaaa',
      postAt: new Date(),
    },
  ]
  return (
    <div className='top-wrapper'>
      <div className='header'>
        <SearchAppBar />
      </div>
      <div className='title-content-card'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            TabIndicatorProps={{ style: { background: 'black' } }}
            textColor='inherit'
            sx={{ fontWeight: '900' }}
            value={tabIndex}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Tech' />
            <Tab label='Ideas' />
          </Tabs>
        </Box>
        <div className='content-card-list'>
          <div className='grid-system'>
            {tabIndex === 0 ? (
              contentList.map((content, key) => <ContentCard content={content} key={key} />)
            ) : (
              <h1>aaa</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
