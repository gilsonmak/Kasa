import "./tag.scss"

import React from 'react'

export default function Tag({tag}) {
  return (
    <div className="tag-container">
        <div className="tag">
            {tag}
        </div>
    </div>
  )
}