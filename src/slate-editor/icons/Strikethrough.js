import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import StrikethroughS from '@material-ui/icons/StrikethroughS';

import MARKS from '../constants/marks';
import hasMark from '../utils/hasMark'

function Strikethrough(props) {
  const { onChange, value } = props;
  const type = MARKS.STRIKETHROUGH;
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault();
    const change = value.change().toggleMark(type);

    onChange(change);
  }

  return (
    <Tooltip title="⌘ + d" placement="bottom">
      <span onMouseDown={onClickMark} data-active={isActive}>
        <StrikethroughS style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  );
}

export default Strikethrough;
