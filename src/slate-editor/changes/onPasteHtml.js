import Html from 'slate-html-serializer';
import { getEventTransfer } from 'slate-react';
import rules from '../rules';

const serializer = new Html({ rules });

const onPasteHtml = (e, change) => {
  if (e.shiftKey) return;
  const transfer = getEventTransfer(e);
  const { html, rich, text } = transfer;
  if (rich) {
    return change.insertText(text);
  }
  const { document } = serializer.deserialize(html);
  change.insertFragment(document);
  return true;
};

export default onPasteHtml;
