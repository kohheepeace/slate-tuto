import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import FormatBold from '@material-ui/icons/FormatBold';

function Bold(props) {
  const { onMouseDown, isActive } = props;

  return (
    /* eslint-disable */
    <Tooltip id="tooltip-block-bold" title="⌘ + b" placement="bottom">
      <span onMouseDown={onMouseDown} data-active={isActive}>
        <FormatBold style={{ fontSize: 20 }} />
      </span>
    </Tooltip>
    /* eslint-disable */
  );
}

export default Bold;
