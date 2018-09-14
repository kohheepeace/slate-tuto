import { LINK } from '../constants/inlines';

const insertLink = (change, href) => {
  if (change.value.isCollapsed) {
    change
      .insertText(href)
      .extend(0 - href.length)
      .wrapInline({
        type: LINK,
        data: { href },
      })
      .collapseToEnd();
  } else {
    change.wrapInline({
      type: LINK,
      data: { href },
    });

    change.collapseToEnd();
  }
};

export default insertLink;
