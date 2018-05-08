import React from 'react';

import BLOCKS from '../constants/blocks';
import Heading from './Heading';

const renderNode = (props) => {
  const { attributes, children, node } = props;
  switch (node.type) {
    case BLOCKS.PARAGRAPH:
      return <p {...attributes}>{children}</p>;
    case BLOCKS.HEADING_1:
      return <Heading {...props} />;
    case BLOCKS.HEADING_2:
      return <Heading {...props} />;
    case BLOCKS.HEADING_3:
      return <Heading {...props} />;
    case BLOCKS.HEADING_4:
      return <Heading {...props} />;
    case BLOCKS.HEADING_5:
      return <Heading {...props} />;
    case BLOCKS.HEADING_6:
      return <Heading {...props} />;
    default:
      break;
  }
};
export default renderNode;
