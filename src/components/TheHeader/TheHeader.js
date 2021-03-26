import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import LogoSecondary from '@/components/icons/LogoSecondary'
import magnifier from '@/assets/images/svg/magnifier.svg'

import './the-header.scss'

const TheHeader = props => {
  const { shouldSticking } = props
  const classList = [
    'the-header',
    'ptb-14',
    shouldSticking ? 'the-header--sticky' : ''
  ]

  return (
    <div className={classList.join(' ')}>
      <div className="icon">
        <LogoSecondary fill={shouldSticking ? '#DADADA' : '#FFF'} />
      </div>
      <div className="search-bar">
        <img src={magnifier} />
        <input type="text"/>
      </div>
      <Icon
        icon={faHeart}
        color={shouldSticking ? '#DADADA' : '#FFF'}
        className="icon"
      />
      <Icon
        icon={faShoppingCart}
        color={shouldSticking ? '#DADADA' : '#FFF'}
        className="icon"
      />
    </div>
  )
}

export default TheHeader
