import React from 'react'
import ReactMarkdown from 'react-markdown'

type ArticleTextProps = {
  key?: string
  className?: string
  text?: string
}

export default function ArticleText({ text, ...props }: ArticleTextProps) {
  return (
    <h3 {...props}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </h3>
  )
}
