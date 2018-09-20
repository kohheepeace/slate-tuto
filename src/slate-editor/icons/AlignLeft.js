import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft'

function AlignLeft (props) {
  const { onChange, value } = props
  const change = value.change()
  const onClickBlock = (e) => {
    e.preventDefault()
    onChange(change.setBlocks({ data: { align: 'left' } }))
  }
  return (
    <Tooltip title='align left' placement='bottom'>
      <span onMouseDown={onClickBlock}>
        <FormatAlignLeft style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default AlignLeft
