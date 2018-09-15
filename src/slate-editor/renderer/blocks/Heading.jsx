import React from 'react';
import { DropTarget } from 'react-dnd';

const imageTarget = {
  canDrop(props) {
    return props.parent.object === 'document';
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

function Heading(props) {
  const {
    connectDropTarget, isOver, attributes, children, canDrop, node,
  } = props;

  const { type } = node;
  const level = type.split('_')[1];
  const Tag = `h${level}`;
  const textAlign = node.get('data').get('align', 'left');
  const style = { borderBottom: isOver && canDrop ? '3px solid #17a2b8' : 'none', textAlign }

  return connectDropTarget((
    <Tag style={style} {...attributes}>
      {children}
    </Tag>
  ));
}
export default DropTarget('image', imageTarget, collect)(Heading);
