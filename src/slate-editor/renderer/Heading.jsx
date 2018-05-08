import React from 'react';

function Heading(props) {
  const {
    attributes, children, node,
  } = props;

  const { type } = node;
  const level = type.split('_')[1];
  const Tag = `h${level}`;

  return (
    <Tag {...attributes}>
      {children}
    </Tag>
  );
}
export default Heading;
