import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';

import SlateEditList from 'slate-edit-list';

import BLOCKS from '../constants/blocks';

const ListPlugin = SlateEditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
});

function OlList(props) {
  const { onChange, value } = props;
  const change = value.change();
  const type = BLOCKS.OL_LIST

  const isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === type;
  const onClickBlock = (e) => {
    e.preventDefault()
    isActive ?
            onChange(ListPlugin.changes.unwrapList(change))
            :
            onChange(ListPlugin.changes.wrapInList(change, type));
  }
  return (
    <Tooltip title='1. + space' placement="bottom">
      <span onMouseDown={onClickBlock} data-active={isActive}>
        <FormatListNumbered style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  );
}

export default OlList;
