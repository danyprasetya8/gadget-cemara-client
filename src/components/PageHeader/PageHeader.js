import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PropTypes from 'prop-types'

import './page-header.scss'

const PageHeader = props => {
  return (
    <div className="page-header">
      <Icon
        icon={faArrowLeft}
        onClick={props.onBack}
        color="#55C595"
      />
      <strong>{props.title}</strong>
    </div>
  )
}

export default PageHeader

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
}