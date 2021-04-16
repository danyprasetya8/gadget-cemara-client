import React from 'react'
import PropTypes from 'prop-types'

import './bottom-sheet.scss'

const BottomSheet = props => {
  return (
    <div className="bottom-sheet">
      <div
        className="bottom-sheet__mask"
        onClick={props.onClose}
      />
      <div className="bottom-sheet__body">
        {props.children}
      </div>
    </div>
  )
}

export default BottomSheet

BottomSheet.propTypes = {
  onClose: PropTypes.func.isRequired
}