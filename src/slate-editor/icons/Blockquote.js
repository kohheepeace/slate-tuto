import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatQuote from '@material-ui/icons/FormatQuote'
import SlateEditBlockquote from 'slate-edit-blockquote'

const BlockquotePlugin = SlateEditBlockquote()

function Blockquote (props) {
  const { onChange, value } = props
  const change = value.change()
  const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
  const onCLickBlock = (e) => {
    e.preventDefault()
    isActive
      ? onChange(BlockquotePlugin.changes.unwrapBlockquote(change))
      : onChange(BlockquotePlugin.changes.wrapInBlockquote(change))
  }
  return (
    <Tooltip title='> + space' placement='bottom'>
      <span onMouseDown={onCLickBlock} data-active={isActive}>
        <FormatQuote style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default Blockquote
