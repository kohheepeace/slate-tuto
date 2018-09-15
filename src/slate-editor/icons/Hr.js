import React from 'react';

import Tooltip from 'material-ui/Tooltip';

import hasBlock from '../utils/hasBlock';
import BLOCKS from '../constants/blocks';

function Hr(props) {
  const { onChange, value } = props;
  const change = value.change();
  const type = BLOCKS.HR
  const isActive = hasBlock(value, type);
  const onClickBlock = (e) => {
    e.preventDefault()
    onChange(change.setBlocks({ type, isVoid: true }))
  }
  return (
    <Tooltip title="--- + enter" placement="bottom">
      <span onMouseDown={onClickBlock} data-active={isActive}>
        <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>HR</div>
      </span>
    </Tooltip>
  );
}

export default Hr;
