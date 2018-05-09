import AutoReplace from 'slate-auto-replace';
import SlatePrism from 'slate-prism';
import SlateEditCode from 'slate-edit-code';
import Prism from 'prismjs';
import PrismLoader from 'prismjs-components-loader';
import componentIndex from 'prismjs-components-loader/lib/all-components';

import MARKS from '../constants/marks';
import BLOCKS from '../constants/blocks';
import markHotkey from './markHotkey';
import exitHeading from './exitHeading';

const prismLoader = new PrismLoader(componentIndex);

const plugins = [
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
