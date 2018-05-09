import AutoReplace from 'slate-auto-replace';
import SlatePrism from 'slate-prism';
import SlateEditCode from 'slate-edit-code';
import Prism from 'prismjs';
import PrismLoader from 'prismjs-components-loader';
import componentIndex from 'prismjs-components-loader/lib/all-components';
import SlateEditList from 'slate-edit-list';
import SlateEditBlockquote from 'slate-edit-blockquote';

import MARKS from '../constants/marks';
import BLOCKS from '../constants/blocks';
import markHotkey from './markHotkey';
import exitHeading from './exitHeading';

const prismLoader = new PrismLoader(componentIndex);

const plugins = [
  SlateEditBlockquote(),
  SlateEditList({
    types: [BLOCKS.CHECK_LIST],
    typeItem: BLOCKS.CHECK_LIST_ITEM,
  }),
  SlateEditList({
    types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
    typeItem: BLOCKS.LIST_ITEM,
  }),
  SlateEditCode(),
  SlatePrism({
    onlyIn: (node => node.type === BLOCKS.CODE_BLOCK),
    getSyntax: ((node) => {
      const syntax = node.data.get('syntax');
      /* If there is syntax data in code_block and it matches prism syntax,
       load prism syntax components by Prism Loader */
      const index = Object.keys(componentIndex).indexOf(syntax);
      if (syntax && index !== -1) { prismLoader.load(Prism, syntax); }
      return syntax;
    }),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: transform => SlateEditBlockquote().changes.wrapInBlockquote(transform),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(\[\])$/,
    transform: transform => SlateEditList().changes.wrapInList(transform, BLOCKS.CHECK_LIST),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-)$/,
    transform: transform => SlateEditList().changes.wrapInList(transform, BLOCKS.UL_LIST),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(1.)$/,
    transform: transform => SlateEditList().changes.wrapInList(transform, BLOCKS.OL_LIST),
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(-{3})$/,
    transform: transform => transform.insertBlock({
      type: BLOCKS.HR,
      isVoid: true,
    }),
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(`{3}.*)/,
    transform: (transform, e, matches) => {
      const input = matches.before.input.replace('```', '');
      const filename = input.split(':')[0];
      const syntax = input.split(':')[1] && input.split(':')[1].toLowerCase();

      const change = transform.setBlocks({ data: { filename, syntax } });

      return SlateEditCode().changes.wrapCodeBlock(change);
    },
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    transform: (transform, e, matches) => {
      const [hashes] = matches.before;
      const level = hashes.length;
      return transform.setBlocks({ type: `heading_${level}` });
    },
    ignoreIn: 'code_line', /* ignore in code_line */
  }),
  exitHeading(),
  markHotkey({ key: 'b', type: MARKS.BOLD }),
  markHotkey({ key: 'i', type: MARKS.ITALIC }),
  markHotkey({ key: 'd', type: MARKS.STRIKETHROUGH }),
  markHotkey({ key: 'e', type: MARKS.HIGHLIGHT }),
  markHotkey({ key: 'u', type: MARKS.UNDERLINE }),
  markHotkey({ key: '9', type: MARKS.CODE, isShiftKey: true }),
];

export default plugins;
