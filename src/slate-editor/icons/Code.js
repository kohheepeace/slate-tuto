import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import Code from '@material-ui/icons/Code';

import MARKS from '../constants/marks';
import hasMark from '../utils/hasMark'

function CodeIcon(props) {
  const { onChange, value } = props;
  const type = MARKS.CODE;
  const isActive = hasMark(value, type)
  const onClickMark = (e) => {
    e.preventDefault();
    const change = value.change().toggleMark(type);

    onChange(change);
  }

  return (
    <Tooltip title="⌘ + shift + 9" placement="bottom">
      <span onMouseDown={onClickMark} data-active={isActive}>
        <Code style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
  );
}

export default CodeIcon;
