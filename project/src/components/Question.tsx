import React from 'react'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

export default function Question({content, author}: QuestionProps) {
  return (
    <div className="Question">
      <p>{content}</p>
    </div>
  )
}
