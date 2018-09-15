import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatAlignRight from '@material-ui/icons/FormatAlignRight'

function AlignRight (props) {
  const { onChange, value } = props
  const change = value.change()
  const isActive = value.blocks.some(block => block.get('data').get('align') == 'right')
  const onCLickBlock = (e) => {
    e.preventDefault()
    isActive
      ? onChange(change.setBlocks({ data: { align: 'left' } }))
      : onChange(change.setBlocks({ data: { align: 'right' } }))
  }
  return (
    <Tooltip title='align right' placement='bottom'>
      <span onMouseDown={onCLickBlock} data-active={isActive}>
        <FormatAlignRight style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default AlignRight
