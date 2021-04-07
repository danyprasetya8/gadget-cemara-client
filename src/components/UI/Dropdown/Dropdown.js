import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import './dropdown.scss'

const Dropdown = props => {
  const [visibleDropdownList, setVisibleDropdownList] = useState(false)

  const handleClick = () => {
    if (props.disabled) return
    return setVisibleDropdownList(prev => !prev)
  }

  return (
    <div className={['Dropdown', props.disabled ? 'Dropdown__disabled' : '' ].join(' ')}>
      <div
        className="Dropdown__title"
        onClick={handleClick}
      >
        <div>{ props.selected ? props.selected : 'Pilih salah satu' }</div>
        <Icon
          icon={faChevronDown}
          color="#9A9898"
        />
      </div>
      {
        visibleDropdownList && (
          <div className="Dropdown__list-container">
            {
              props.listItem.map(item => {
                return (
                  <div
                    className="Dropdown__list-item"
                    onClick={() => props.handleSelectItem(item)}
                  >
                    {item.value}
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Dropdown
