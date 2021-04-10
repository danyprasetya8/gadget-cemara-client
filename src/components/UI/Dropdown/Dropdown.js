import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './dropdown.scss'

const Dropdown = props => {
  const [visibleDropdownList, setVisibleDropdownList] = useState(false)

  const toggleDropdown = () => {
    if (props.disabled) return
    return setVisibleDropdownList(prev => !prev)
  }

  const handleClickDropdownItem = item => {
    props.handleSelectItem(item)
    setVisibleDropdownList(prev => !prev)
  }

  return (
    <div className={[
      'Dropdown',
      props.disabled ? 'Dropdown__disabled' : '',
      props.error ? 'Dropdown__error' : ''
    ].join(' ')}>
      <div
        className="Dropdown__title"
        onClick={toggleDropdown}
      >
        <div>{ props.selected.value ? props.selected.value : 'Pilih salah satu' }</div>
        <Icon
          icon={faChevronDown}
          color="#9A9898"
        />
      </div>
      {
        visibleDropdownList && (
          <>
            <div
              className="Dropdown__mask"
              onClick={() => setVisibleDropdownList(prev => !prev)}
            />
            <div className="Dropdown__list-container">
              {
                props.listItem.map(item => {
                  return (
                    <div
                      key={item.id}
                      className="Dropdown__list-item"
                      onClick={() => handleClickDropdownItem(item)}
                    >
                      {item.value}
                    </div>
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

Dropdown.propTypes = {
  selected: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  listItem: PropTypes.array.isRequired,
  handleSelectItem: PropTypes.func.isRequired
}

export default Dropdown
