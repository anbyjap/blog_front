import React from 'react'
import { ContentTitleCard } from '../../components/ContentTitleCard/ContentTitleCard'
import './Top.scss'
import { BlogContent } from '../../components/BlogContent/BlogContent'

export const Top = () => {
  return (
    <div className='top-wrapper'>
      <div className='title-content-card'>
        <ContentTitleCard />
      </div>
      <div>
        <BlogContent />
      </div>
    </div>
  )
}
