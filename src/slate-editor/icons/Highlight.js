import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import BorderColor from '@material-ui/icons/BorderColor'

import MARKS from '../constants/marks'
import hasMark from '../utils/hasMark'

function Highlight (props) {
  const { onChange, value } = props
  const type = MARKS.HIGHLIGHT
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault()
    const change = value.change().toggleMark(type)

    onChange(change)
  }

  return (
    <Tooltip title='⌘ + e' placement='bottom'>
      <span onMouseDown={onClickMark} data-active={isActive}>
        <BorderColor style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default Highlight
