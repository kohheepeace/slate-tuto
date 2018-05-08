'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isHotkey = require('is-hotkey');
var slateDevEnvironment = require('slate-dev-environment');

/**
 * Is Apple?
 *
 * @type {Boolean}
 */

var IS_APPLE = slateDevEnvironment.IS_IOS || slateDevEnvironment.IS_MAC;

/**
 * Hotkeys.
 *
 * @type {Function}
 */

var isBold = isHotkey.isKeyHotkey('mod+b');
var isItalic = isHotkey.isKeyHotkey('mod+i');

var isEnter = isHotkey.isKeyHotkey('enter');
var isShiftEnter = isHotkey.isKeyHotkey('shift+enter');
var isSplitBlock = function isSplitBlock(e) {
  return isEnter(e) || isShiftEnter(e);
};

var isBackspace = isHotkey.isKeyHotkey('backspace');
var isShiftBackspace = isHotkey.isKeyHotkey('shift+backspace');
var isDelete = isHotkey.isKeyHotkey('delete');
var isShiftDelete = isHotkey.isKeyHotkey('shift+delete');
var isDeleteBackward = function isDeleteBackward(e) {
  return isBackspace(e) || isShiftBackspace(e);
};
var isDeleteForward = function isDeleteForward(e) {
  return isDelete(e) || isShiftDelete(e);
};

var isDeleteCharBackwardMac = isHotkey.isKeyHotkey('ctrl+h');
var isDeleteCharForwardMac = isHotkey.isKeyHotkey('ctrl+d');
var isDeleteCharBackward = function isDeleteCharBackward(e) {
  return isDeleteBackward(e) || IS_APPLE && isDeleteCharBackwardMac(e);
};
var isDeleteCharForward = function isDeleteCharForward(e) {
  return isDeleteForward(e) || IS_APPLE && isDeleteCharForwardMac(e);
};

var isDeleteLineBackwardMac = function isDeleteLineBackwardMac(e) {
  return isHotkey.isKeyHotkey('cmd+shift+backspace', e) || isHotkey.isKeyHotkey('cmd+backspace', e);
};
var isDeleteLineForwardMac = isHotkey.isKeyHotkey('ctrl+k');
var isDeleteLineBackward = function isDeleteLineBackward(e) {
  return IS_APPLE && isDeleteLineBackwardMac(e);
};
var isDeleteLineForward = function isDeleteLineForward(e) {
  return IS_APPLE && isDeleteLineForwardMac(e);
};

var isDeleteWordBackwardMac = function isDeleteWordBackwardMac(e) {
  return isHotkey.isKeyHotkey('shift+option+backspace', e) || isHotkey.isKeyHotkey('option+backspace', e);
};
var isDeleteWordBackwardPC = isHotkey.isKeyHotkey('ctrl+backspace');
var isDeleteWordForwardMac = function isDeleteWordForwardMac(e) {
  return isHotkey.isKeyHotkey('shift+option+delete', e) || isHotkey.isKeyHotkey('option+delete', e);
};
var isDeleteWordForwardPC = isHotkey.isKeyHotkey('ctrl+delete');
var isDeleteWordBackward = function isDeleteWordBackward(e) {
  return IS_APPLE ? isDeleteWordBackwardMac(e) : isDeleteWordBackwardPC(e);
};
var isDeleteWordForward = function isDeleteWordForward(e) {
  return IS_APPLE ? isDeleteWordForwardMac(e) : isDeleteWordForwardPC(e);
};

var isExtendCharForward = isHotkey.isKeyHotkey('shift+right');
var isExtendCharBackward = isHotkey.isKeyHotkey('shift+left');

var isRightArrow = isHotkey.isKeyHotkey('right');
var isLeftArrow = isHotkey.isKeyHotkey('left');
var isCollapseCharForward = function isCollapseCharForward(e) {
  return isRightArrow(e) && !isExtendCharForward(e);
};
var isCollapseCharBackward = function isCollapseCharBackward(e) {
  return isLeftArrow(e) && !isExtendCharBackward(e);
};

var isCollapseLineBackwardMac = isHotkey.isKeyHotkey('option+up');
var isCollapseLineForwardMac = isHotkey.isKeyHotkey('option+down');
var isCollapseLineBackward = function isCollapseLineBackward(e) {
  return IS_APPLE && isCollapseLineBackwardMac(e);
};
var isCollapseLineForward = function isCollapseLineForward(e) {
  return IS_APPLE && isCollapseLineForwardMac(e);
};

var isExtendLineBackwardMac = isHotkey.isKeyHotkey('option+shift+up');
var isExtendLineForwardMac = isHotkey.isKeyHotkey('option+shift+down');
var isExtendLineBackward = function isExtendLineBackward(e) {
  return IS_APPLE && isExtendLineBackwardMac(e);
};
var isExtendLineForward = function isExtendLineForward(e) {
  return IS_APPLE && isExtendLineForwardMac(e);
};

var isUndo = isHotkey.isKeyHotkey('mod+z');
var isRedoMac = isHotkey.isKeyHotkey('mod+shift+z');
var isRedoPC = isHotkey.isKeyHotkey('mod+y');
var isRedo = function isRedo(e) {
  return IS_APPLE ? isRedoMac(e) : isRedoPC(e);
};

var isTransposeCharacterMac = isHotkey.isKeyHotkey('ctrl+t');
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

exports.default = index;
//# sourceMappingURL=slate-hotkeys.js.map
