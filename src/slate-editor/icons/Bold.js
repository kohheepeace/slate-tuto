import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatBold from '@material-ui/icons/FormatBold'
import MARKS from '../constants/marks'
import hasMark from '../utils/hasMark'

function Bold (props) {
  const { onChange, value } = props
  const type = MARKS.BOLD
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault()
    const change = value.change().toggleMark(type)

    onChange(change)
  }

  return (
    <Tooltip title='⌘ + b' placement='bottom'>
      <span onMouseDown={onClickMark} data-active={isActive}>
        <FormatBold style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default Bold
