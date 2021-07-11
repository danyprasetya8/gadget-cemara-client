import React, { Component } from 'react'

import './form-input.scss'
import Dropdown from '@UI/Dropdown/Dropdown'
class FormInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { 
      children,
      form,
      error,
      formInputList,
      onSubmit,
      handleFormInputChange
    } = this.props

    return (
      <form
        className="form-input p-16"
        onSubmit={onSubmit}
        onKeyUp={e => e.key === 'Enter' && e.preventDefault() && onSubmit()}
      >
        {
          formInputList.map(({ title, name, placeholder, type, textNumber }) => {
            return (
              <React.Fragment key={name}>
                <div className="FormInput__title">{title}</div>
                <input
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  value={form[name]}
                  onChange={e => handleFormInputChange(e, name)}
                  className={error[name].length ? 'input-error' : ''}
                  pattern={textNumber ? '[0-9]*' : '[^]*'}
                />
                {
                  !!error[name].length && (
                    <div className="form-input__error">
                      {
                        error[name].map(err => (<div key={err}>{err}</div>))
                      }
                    </div>
                  )
                }
              </React.Fragment>
            )
          })
        }
        {children}
      </form>
    )
  }
}

export default FormInput
