import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter'

function AlignCenter (props) {
  const { onChange, value } = props
  const change = value.change()
  const isActive = value.blocks.some(block => block.get('data').get('align') === 'center')
  const onCLickBlock = (e) => {
    e.preventDefault()
    isActive
      ? onChange(change.setBlocks({ data: { align: 'left' } }))
      : onChange(change.setBlocks({ data: { align: 'center' } }))
  }
  return (
    <Tooltip title='align center' placement='bottom'>
      <span onMouseDown={onCLickBlock} data-active={isActive}>
        <FormatAlignCenter style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default AlignCenter
