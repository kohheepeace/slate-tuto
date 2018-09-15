import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatUnderlined from '@material-ui/icons/FormatUnderlined'

import MARKS from '../constants/marks'
import hasMark from '../utils/hasMark'

function Underline (props) {
  const { onChange, value } = props
  const type = MARKS.UNDERLINE
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault()
    const change = value.change().toggleMark(type)

    onChange(change)
  }

  return (
    <Tooltip title='⌘ + u' placement='bottom'>
      <span onMouseDown={onClickMark} data-active={isActive}>
        <FormatUnderlined style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default Underline
