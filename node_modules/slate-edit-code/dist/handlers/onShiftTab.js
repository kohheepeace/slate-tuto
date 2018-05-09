'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _changes = require('../changes');

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(opts, event, change, editor) {
    var value = change.value;

    event.preventDefault();
    event.stopPropagation();

    var indent = (0, _utils.getCurrentIndent)(opts, value);

    // We dedent all selected lines
    return (0, _changes.dedentLines)(opts, change, indent);
}
exports.default = onShiftTab;