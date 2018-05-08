import React from 'react';
import MARKS from '../constants/marks';

const renderMark = (props) => {
  const { children, mark } = props;
  switch (mark.type) {
    case MARKS.BOLD:
      return <strong>{children}</strong>;
    case MARKS.ITALIC:
      return <em>{children}</em>;
    case MARKS.STRIKETHROUGH:
      return <del>{children}</del>;
    case MARKS.UNDERLINE:
      return <u>{children}</u>;
    case MARKS.CODE:
      return <code>{children}</code>;
    case MARKS.HIGHLIGHT:
      return <mark>{children}</mark>;
    default:
      return null;
  }
};

export default renderMark;
