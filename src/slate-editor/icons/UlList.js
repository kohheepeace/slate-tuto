import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'

import SlateEditList from 'slate-edit-list'

import BLOCKS from '../constants/blocks'

const ListPlugin = SlateEditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM
})

function UlList (props) {
  const { onChange, value } = props
  const change = value.change()
  const type = BLOCKS.UL_LIST

  const isActive = ListPlugin.utils.isSelectionInList(value) &&
                    ListPlugin.utils.getCurrentList(value).type === type
  const onClickBlock = (e) => {
    e.preventDefault()
    isActive
      ? onChange(ListPlugin.changes.unwrapList(change))
      : onChange(ListPlugin.changes.wrapInList(change, type))
  }
  return (
    <Tooltip title='- + space' placement='bottom'>
      <span onMouseDown={onClickBlock} data-active={isActive}>
        <FormatListBulleted style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default UlList
