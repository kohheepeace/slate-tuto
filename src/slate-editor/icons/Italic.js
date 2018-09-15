import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import FormatItalic from '@material-ui/icons/FormatItalic';

import MARKS from '../constants/marks';
import hasMark from '../utils/hasMark'

function Italic(props) {
  const { onChange, value } = props;
  const type = MARKS.ITALIC;
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault();
    const change = value.change().toggleMark(type);

    onChange(change);
  }

  return (
    <Tooltip title="⌘ + i" placement="bottom">
      <span onMouseDown={onClickMark} data-active={isActive}>
        <FormatItalic style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  );
}

export default Italic;
