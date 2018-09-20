import React from 'react'

import Tooltip from 'material-ui/Tooltip'

import hasBlock from '../utils/hasBlock'
import BLOCKS from '../constants/blocks'

function Heading (props) {
  const { onChange, value, level } = props
  const change = value.change()
  const type = BLOCKS[`HEADING_${level}`]
  const title = `${'#'.repeat(level)} + space`

  const isActive = hasBlock(value, type)
  const onClickBlock = (e) => {
    e.preventDefault()
    onChange(change.setBlocks(isActive ? BLOCKS.PARAGRAPH : type))
  }
  const Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>{`H${level}`}</div>
  return (
    <Tooltip title={title} placement='bottom'>
      <span onMouseDown={onClickBlock} data-active={isActive}>
        {Tag}
      </span>
    </Tooltip>
  )
}

export default Heading
