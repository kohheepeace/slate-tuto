import React from 'react';

import BLOCKS from '../constants/blocks';
import Heading from './Heading';
import CodeBlock from './CodeBlock';
import CheckListItem from './CheckListItem';

const renderNode = (props) => {
  const {
    attributes, children, node, isSelected,
  } = props;
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
    case BLOCKS.CODE_BLOCK:
      return <CodeBlock {...props} />;
    case BLOCKS.CODE_LINE:
      return <div {...attributes}>{children}</div>;
    case BLOCKS.HR:
      return <hr {...attributes} style={isSelected ? { outline: '1px solid #17a2b8' } : null} />;
    case BLOCKS.UL_LIST:
      return <ul {...attributes}>{children}</ul>;
    case BLOCKS.OL_LIST:
      return <ol {...attributes}>{children}</ol>;
    case BLOCKS.LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case BLOCKS.CHECK_LIST:
      return <ul {...attributes}>{children}</ul>;
    case BLOCKS.CHECK_LIST_ITEM:
      return <CheckListItem {...props} />;
    default:
      break;
  }
};
export default renderNode;
