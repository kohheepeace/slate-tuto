import MARKS from '../constants/marks';
import markHotkey from './markHotkey';

const plugins = [
  markHotkey({ key: 'b', type: MARKS.BOLD }),
  markHotkey({ key: 'i', type: MARKS.ITALIC }),
  markHotkey({ key: 'd', type: MARKS.STRIKETHROUGH }),
  markHotkey({ key: 'e', type: MARKS.HIGHLIGHT }),
  markHotkey({ key: 'u', type: MARKS.UNDERLINE }),
  markHotkey({ key: '9', type: MARKS.CODE, isShiftKey: true }),
];

export default plugins;
