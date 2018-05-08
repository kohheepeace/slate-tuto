import AutoReplace from 'slate-auto-replace';

import MARKS from '../constants/marks';
import markHotkey from './markHotkey';
import exitHeading from './exitHeading';

const plugins = [
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
