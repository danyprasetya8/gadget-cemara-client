import React from 'react'

import './input.scss'

const Input = ({ errorMessage, title, ...props }) => {
  const classList = [
    'Input',
    errorMessage ? 'Input__error' : ''
  ]
  return (
    <>
      <div className="Input__title">{title}</div>
      <input
        className={classList.join(' ')}
        { ...props }
      />
      {
        !!errorMessage && (
          <div className="Input__error-msg">
            { errorMessage }
          </div>
        )
      }
    </>
  )
}

export default Input
