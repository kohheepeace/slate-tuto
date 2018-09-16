import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import Code from '@material-ui/icons/Code'

import SlateEditCode from 'slate-edit-code'
import BLOCKS from '../constants/blocks'

const CodePlugin = SlateEditCode({ exitBlockType: BLOCKS.PARAGRAPH })

function CodeBlock (props) {
  const { onChange, value } = props
  const change = value.change()

  const isActive = CodePlugin.utils.isInCodeBlock(value)
  const onClickBlock = (e) => {
    e.preventDefault()
    onChange(CodePlugin.changes.toggleCodeBlock(change, 'paragraph'))
  }
  return (
    <Tooltip title='```foo.rb:ruby + enter' placement='bottom'>
      <span onMouseDown={onClickBlock} data-active={isActive}>
        <Code style={{ fontSize: 18, border: '1px solid', borderRadius: 4 }} />
      </span>
    </Tooltip>
  )
}

export default CodeBlock
