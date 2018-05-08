import { isKeyHotkey } from 'is-hotkey';
import { IS_IOS, IS_MAC } from 'slate-dev-environment';

/**
 * Is Apple?
 *
 * @type {Boolean}
 */

var IS_APPLE = IS_IOS || IS_MAC;

/**
 * Hotkeys.
 *
 * @type {Function}
 */

var isBold = isKeyHotkey('mod+b');
var isItalic = isKeyHotkey('mod+i');

var isEnter = isKeyHotkey('enter');
var isShiftEnter = isKeyHotkey('shift+enter');
var isSplitBlock = function isSplitBlock(e) {
  return isEnter(e) || isShiftEnter(e);
};

var isBackspace = isKeyHotkey('backspace');
var isShiftBackspace = isKeyHotkey('shift+backspace');
var isDelete = isKeyHotkey('delete');
var isShiftDelete = isKeyHotkey('shift+delete');
var isDeleteBackward = function isDeleteBackward(e) {
  return isBackspace(e) || isShiftBackspace(e);
};
var isDeleteForward = function isDeleteForward(e) {
  return isDelete(e) || isShiftDelete(e);
};

var isDeleteCharBackwardMac = isKeyHotkey('ctrl+h');
var isDeleteCharForwardMac = isKeyHotkey('ctrl+d');
var isDeleteCharBackward = function isDeleteCharBackward(e) {
  return isDeleteBackward(e) || IS_APPLE && isDeleteCharBackwardMac(e);
};
var isDeleteCharForward = function isDeleteCharForward(e) {
  return isDeleteForward(e) || IS_APPLE && isDeleteCharForwardMac(e);
};

var isDeleteLineBackwardMac = function isDeleteLineBackwardMac(e) {
  return isKeyHotkey('cmd+shift+backspace', e) || isKeyHotkey('cmd+backspace', e);
};
var isDeleteLineForwardMac = isKeyHotkey('ctrl+k');
var isDeleteLineBackward = function isDeleteLineBackward(e) {
  return IS_APPLE && isDeleteLineBackwardMac(e);
};
var isDeleteLineForward = function isDeleteLineForward(e) {
  return IS_APPLE && isDeleteLineForwardMac(e);
};

var isDeleteWordBackwardMac = function isDeleteWordBackwardMac(e) {
  return isKeyHotkey('shift+option+backspace', e) || isKeyHotkey('option+backspace', e);
};
var isDeleteWordBackwardPC = isKeyHotkey('ctrl+backspace');
var isDeleteWordForwardMac = function isDeleteWordForwardMac(e) {
  return isKeyHotkey('shift+option+delete', e) || isKeyHotkey('option+delete', e);
};
var isDeleteWordForwardPC = isKeyHotkey('ctrl+delete');
var isDeleteWordBackward = function isDeleteWordBackward(e) {
  return IS_APPLE ? isDeleteWordBackwardMac(e) : isDeleteWordBackwardPC(e);
};
var isDeleteWordForward = function isDeleteWordForward(e) {
  return IS_APPLE ? isDeleteWordForwardMac(e) : isDeleteWordForwardPC(e);
};

var isExtendCharForward = isKeyHotkey('shift+right');
var isExtendCharBackward = isKeyHotkey('shift+left');

var isRightArrow = isKeyHotkey('right');
var isLeftArrow = isKeyHotkey('left');
var isCollapseCharForward = function isCollapseCharForward(e) {
  return isRightArrow(e) && !isExtendCharForward(e);
};
var isCollapseCharBackward = function isCollapseCharBackward(e) {
  return isLeftArrow(e) && !isExtendCharBackward(e);
};

var isCollapseLineBackwardMac = isKeyHotkey('option+up');
var isCollapseLineForwardMac = isKeyHotkey('option+down');
var isCollapseLineBackward = function isCollapseLineBackward(e) {
  return IS_APPLE && isCollapseLineBackwardMac(e);
};
var isCollapseLineForward = function isCollapseLineForward(e) {
  return IS_APPLE && isCollapseLineForwardMac(e);
};

var isExtendLineBackwardMac = isKeyHotkey('option+shift+up');
var isExtendLineForwardMac = isKeyHotkey('option+shift+down');
var isExtendLineBackward = function isExtendLineBackward(e) {
  return IS_APPLE && isExtendLineBackwardMac(e);
};
var isExtendLineForward = function isExtendLineForward(e) {
  return IS_APPLE && isExtendLineForwardMac(e);
};

var isUndo = isKeyHotkey('mod+z');
var isRedoMac = isKeyHotkey('mod+shift+z');
var isRedoPC = isKeyHotkey('mod+y');
var isRedo = function isRedo(e) {
  return IS_APPLE ? isRedoMac(e) : isRedoPC(e);
};

var isTransposeCharacterMac = isKeyHotkey('ctrl+t');
var isTransposeCharacter = function isTransposeCharacter(e) {
  return IS_APPLE && isTransposeCharacterMac(e);
};

var isContentEditable = function isContentEditable(e) {
  return isBold(e) || isDeleteCharBackward(e) || isDeleteCharForward(e) || isDeleteLineBackward(e) || isDeleteLineForward(e) || isDeleteWordBackward(e) || isDeleteWordForward(e) || isItalic(e) || isRedo(e) || isSplitBlock(e) || isTransposeCharacter(e) || isUndo(e);
};

var isComposing = function isComposing(e) {
  return e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'Backspace' || e.key == 'Enter';
};

/**
 * Export.
 *
 * @type {Object}
 */

var index = {
  isBold: isBold,
  isCollapseCharBackward: isCollapseCharBackward,
  isCollapseCharForward: isCollapseCharForward,
  isCollapseLineBackward: isCollapseLineBackward,
  isCollapseLineForward: isCollapseLineForward,
  isComposing: isComposing,
  isContentEditable: isContentEditable,
  isDeleteCharBackward: isDeleteCharBackward,
  isDeleteCharForward: isDeleteCharForward,
  isDeleteLineBackward: isDeleteLineBackward,
  isDeleteLineForward: isDeleteLineForward,
  isDeleteWordBackward: isDeleteWordBackward,
  isDeleteWordForward: isDeleteWordForward,
  isExtendCharBackward: isExtendCharBackward,
  isExtendCharForward: isExtendCharForward,
  isExtendLineBackward: isExtendLineBackward,
  isExtendLineForward: isExtendLineForward,
  isItalic: isItalic,
  isRedo: isRedo,
  isSplitBlock: isSplitBlock,
  isUndo: isUndo
};

export default index;
//# sourceMappingURL=slate-hotkeys.es.js.map
