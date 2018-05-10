import { Block, Text } from 'slate';
import { List } from 'immutable';
import BLOCKS from '../constants/blocks';
import MARKS from '../constants/marks';
import INLINES from '../constants/inlines';

const BLOCK_TAGS = {
  p: BLOCKS.PARAGRAPH,
  ol: BLOCKS.OL_LIST,
  ul: BLOCKS.UL_LIST,
  li: BLOCKS.LIST_ITEM,
  table: BLOCKS.TABLE,
  th: BLOCKS.TABLE_CELL,
  tr: BLOCKS.TABLE_ROW,
  td: BLOCKS.TABLE_CELL,
  hr: BLOCKS.HR,
  blockquote: BLOCKS.BLOCKQUOTE,
  h1: BLOCKS.HEADING_1,
  h2: BLOCKS.HEADING_2,
  h3: BLOCKS.HEADING_3,
  h4: BLOCKS.HEADING_4,
  h5: BLOCKS.HEADING_5,
  h6: BLOCKS.HEADING_6,
};

const MARK_TAGS = {
  strong: MARKS.BOLD,
  em: MARKS.ITALIC,
  u: MARKS.UNDERLINE,
  del: MARKS.STRIKETHROUGH,
  code: MARKS.CODE,
  mark: MARKS.HIGHLIGHT,
};

const rules = [
  /* special case for link */
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'a') {
        return {
          object: 'inline',
          type: INLINES.LINK,
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href'),
          },
        };
      }
    },
  },

  /* special case for check list */
  {
    deserialize(el) {
      if (el.tagName.toLowerCase() !== 'ul') return;

      const isCheckList = el.childNodes[0].querySelector('input');

      const checkListItems = List(el.childNodes).map(line =>
        Block.create({
          type: isCheckList ? BLOCKS.CHECK_LIST_ITEM : BLOCKS.LIST_ITEM,
          nodes: [Text.create(line.innerText)],
        }));

      const checkList = Block.create({
        type: isCheckList ? BLOCKS.CHECK_LIST : BLOCKS.UL_LIST,
        nodes: checkListItems,
      });

      return checkList;
    },
  },

  /* special case for CodeBlock */
  {
    deserialize(el) {
      if (el.tagName.toLowerCase() !== 'pre') return;
      const lines = List(el.childNodes).map(line =>
        Block.create({
          type: BLOCKS.CODE_LINE,
          nodes: [Text.create(line.textContent)],
        }));

      const codeBlock = Block.create({
        type: BLOCKS.CODE_BLOCK,
        nodes: lines,
        // data: { filename, syntax },
      });

      return codeBlock;
    },
  },

  {
    // Special case for video, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() !== 'iframe') return;

      return {
        object: 'block',
        type: BLOCKS.VIDEO,
        isVoid: true,
        nodes: next(el.childNodes),
        data: {
          src: el.getAttribute('src'),
          url: el.getAttribute('url'),
        },
      };
    },
  },

  {
    // Special case for img, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() !== 'img') return;

      const src = el.getAttribute('src');
      return {
        object: 'block',
        type: BLOCKS.IMAGE,
        isVoid: true,
        nodes: next(el.childNodes),
        data: { src },
      };
    },
  },

  {
    // Special case for table_cell, to grab align.
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
  },

  /* rules for Block */
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes),
        };
      }
    },
  },

  /* rules for Mark */
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];
      if (mark) {
        return {
          object: 'mark',
          type: mark,
          nodes: next(el.childNodes),
        };
      }
    },
  },
];

export default rules;
