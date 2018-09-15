import React from 'react'

import Tooltip from 'material-ui/Tooltip'
import GridOn from '@material-ui/icons/GridOn'

import SlateEditTable from '@strelka/slate-edit-table'

const TablePlugin = SlateEditTable()

function Heading (props) {
  const { onChange, value } = props
  const change = value.change()
  const isActive = TablePlugin.utils.isSelectionInTable(value)
  const onMouseDown = isActive
    ? () => onChange(TablePlugin.changes.removeTable(change))
    : () => onChange(TablePlugin.changes.insertTable(change))
  return (
    <Tooltip title='table:2x3 + enter' placement='bottom'>
      <span onMouseDown={onMouseDown} data-active={isActive}>
        <GridOn style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  )
}

export default Heading
