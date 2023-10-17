import React from 'react'
import { useLocation } from 'react-router-dom'

export const SearchResultsPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('query')

  // Fetch and display search results based on the 'query' parameter

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      {/* Display search results here */}
    </div>
  )
}
