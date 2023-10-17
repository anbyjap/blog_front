import React, { useState, SyntheticEvent } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import './Search.scss'
import { ContentCard } from '../../components/ContentCard/ContentCard'
import { useLocation } from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL || 'aaa'

export const Search = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('query')
  console.log(process.env.REACT_APP_API_URL)

  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setTabIndex(Number(value))
  }

  const searchContents = (keyword: string) => {
    // Send the GET request using fetch
    fetch(`${apiURL}/search?keyword=${keyword}`)
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json() // Parse the response body as JSON
      })
      .then((data) => {
        // setData(data) // Update state with the fetched data
        // setIsLoading(false) // Set loading to false
      })
      .catch((error) => {
        // setError(error) // Handle any errors
        // setIsLoading(false) // Set loading to false
      })
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

  const judgeContentsIncludeKeyword = (keyword: string | null) => {
    // console.log(keyword, query)

    return true
  }

  return (
    <div className='top-wrapper'>
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
          {query && <h2 style={{ margin: 0 }}>Search Results for: {query}</h2>}
          <div className='grid-system'>
            {tabIndex === 0 ? (
              contentList
                .filter((content) => judgeContentsIncludeKeyword(content.title))
                .map((content, key) => <ContentCard content={content} key={key} />)
            ) : (
              <h1>There is no centents to show.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
