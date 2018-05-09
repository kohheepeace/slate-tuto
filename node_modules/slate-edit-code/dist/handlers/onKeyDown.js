'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isHotkey = require('is-hotkey');

require('slate');

var _utils = require('../utils');

var _onTab = require('./onTab');

var _onTab2 = _interopRequireDefault(_onTab);

var _onShiftTab = require('./onShiftTab');

var _onShiftTab2 = _interopRequireDefault(_onShiftTab);

var _onEnter = require('./onEnter');

var _onEnter2 = _interopRequireDefault(_onEnter);

var _onModEnter = require('./onModEnter');

var _onModEnter2 = _interopRequireDefault(_onModEnter);

var _onBackspace = require('./onBackspace');

var _onBackspace2 = _interopRequireDefault(_onBackspace);

var _onSelectAll = require('./onSelectAll');

var _onSelectAll2 = _interopRequireDefault(_onSelectAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isModA = (0, _isHotkey.isKeyHotkey)('mod+a');

var isShiftTab = (0, _isHotkey.isKeyHotkey)('shift+tab');
var isTab = (0, _isHotkey.isKeyHotkey)('tab');
var isModEnter = (0, _isHotkey.isKeyHotkey)('mod+enter');
var isEnter = (0, _isHotkey.isKeyHotkey)('enter');
var isBackspace = (0, _isHotkey.isKeyHotkey)('backspace');

/**
 * User is pressing a key in the editor
 */
function onKeyDown(opts, event, change, editor) {
    var value = change.value;

    var currentCode = (0, _utils.getCurrentCode)(opts, value);

    // Inside code ?
    if (!currentCode) {
        return undefined;
    }

    // Add opts in the argument list
    var args = [opts, event, change, editor];

    // Select all the code in the block (Mod+a)
    if (opts.selectAll && isModA(event)) {
        return _onSelectAll2.default.apply(undefined, args);
    } else if (isShiftTab(event)) {
        // User is pressing Shift+Tab
        return _onShiftTab2.default.apply(undefined, args);
    } else if (isTab(event)) {
        // User is pressing Tab
        return _onTab2.default.apply(undefined, args);
    } else if (opts.exitBlockType && isModEnter(event)) {
        // User is pressing Mod+Enter
        return _onModEnter2.default.apply(undefined, args);
    } else if (isEnter(event)) {
        // User is pressing Enter
        return _onEnter2.default.apply(undefined, args);
    } else if (isBackspace(event)) {
        // User is pressing Backspace
        return _onBackspace2.default.apply(undefined, args);
    }
    return undefined;
}

exports.default = onKeyDown;