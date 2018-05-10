import { getEventTransfer, getEventRange } from 'slate-react';

import isImage from 'is-image';
import isUrl from 'is-url';
import insertImage from './insertImage';
import insertVideo from './insertVideo';
import insertLink from './insertLink';

const onPasteText = (e, change) => {
  const target = getEventRange(e, change.value);

  const transfer = getEventTransfer(e);
  const { text } = transfer;
  if (!isUrl(text)) return null;

  if (isImage(text)) {
    return change.call(insertImage, text, target);
  } else if (text.match(/youtube\.com|vimeo\.com/)) {
    return change.call(insertVideo, text);
  }
  return change.call(insertLink, text);
};

export default onPasteText;
