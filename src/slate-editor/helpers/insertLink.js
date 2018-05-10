import { LINK } from '../constants/inlines';

const insertLink = (change, url) => {
  if (change.value.isCollapsed) {
    change
      .insertText(url)
      .extend(0 - url.length)
      .wrapInline({
        type: LINK,
        data: { url },
      })
      .collapseToEnd();
  } else {
    change.wrapInline({
      type: LINK,
      data: { url },
    });

    change.collapseToEnd();
  }
};

export default insertLink;
