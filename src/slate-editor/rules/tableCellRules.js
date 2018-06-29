import BLOCKS from '../constants/blocks';

const tableCellRules =
{
  deserialize(el, next) {
    if (el.tagName.toLowerCase() !== 'td') return;
    return {
      object: 'block',
      type: BLOCKS.TABLE_CELL,
      nodes: next(el.childNodes),
      data: {
        align: el.style.textAlign,
      },
    };
  },
};

export default tableCellRules;
