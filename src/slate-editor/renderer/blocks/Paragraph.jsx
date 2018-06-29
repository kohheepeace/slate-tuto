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

function Paragraph(props) {
  const {
    connectDropTarget, isOver, attributes, children, canDrop,
  } = props;
  return connectDropTarget((
    <p style={{ borderBottom: isOver && canDrop ? '3px solid #17a2b8' : 'none' }} {...attributes}>
      {children}
    </p>
  ));
}
export default DropTarget('image', imageTarget, collect)(Paragraph);
