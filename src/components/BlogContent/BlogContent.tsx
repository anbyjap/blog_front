import React from 'react'
import { Box } from '@mui/system'
import './BlogContent.scss'
import { Avatar, Button } from '@mui/material'
import ReactMarkdown from 'react-markdown'

export const BlogContent = () => {
  const markdownString = `
# TeX

x^2 + y^2 = 1 をインライン表示すると $x^2 + y^2 = 1$ になります。

$$ S=\\sum_{n=1}^\\infty a_n $$

$$\\frac{1}{2} $$

# dsadasdsd


dsadfjk iofewsfjdisjfaklfjd


dsakd;lskd;ak;

dsadsdsadsa

# cdasdsa

#  ddd

dsadsdasddas
dsadsdasddas
dsadsdasddas
dsadsdasddas

dsadsdasddas
dsadsdasddas

dsadsdasddas
dsadsdasddas

dsadsdasddas
dsadsdasddas

dsadsdasddas
dsadsdasddas
dsadsdasddas
dsadsdasddas


dsadsdasddas

dsadsdasddas

dsadsdasddas

dsadsdasddas

dsadsdasddas
dsadsdasddas






dsadsdadsa
`

  return (
    <Box className='blog-content-wrapper'>
      <div className='blog-main'>
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
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 id={children[0]?.toString()}>{children[0]}</h1>,
          }}
        >
          {markdownString}
        </ReactMarkdown>
      </div>
      <Box className='title-list'>
        {markdownString
          .split('\n')
          .filter((line) => line.startsWith('#'))
          .map((title, index) => (
            <li key={index}>
              <a href={`#${title.replace('# ', '')}`}>{title.replace('# ', '')}</a>
            </li>
          ))}
      </Box>
    </Box>
  )
}
