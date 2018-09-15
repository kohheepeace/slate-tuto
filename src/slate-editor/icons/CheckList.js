import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import CheckBox from '@material-ui/icons/CheckBox';

import SlateEditList from 'slate-edit-list';

import BLOCKS from '../constants/blocks';

const ListPlugin = SlateEditList({
  types: [BLOCKS.CHECK_LIST],
  typeItem: BLOCKS.CHECK_LIST_ITEM,
});

function CheckList(props) {
  const { onChange, value } = props;
  const change = value.change();
  const type = BLOCKS.CHECK_LIST

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
    <Tooltip title='[] + space' placement="bottom">
      <span onMouseDown={onClickBlock} data-active={isActive}>
        <CheckBox style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  );
}

export default CheckList;
