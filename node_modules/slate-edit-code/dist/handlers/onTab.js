'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _changes = require('../changes');

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
function onTab(opts, event, change, editor) {
    var value = change.value;

    event.preventDefault();
    event.stopPropagation();

    var isCollapsed = value.isCollapsed;

    var indent = (0, _utils.getCurrentIndent)(opts, value);

    // Selection is collapsed, we just insert an indent at cursor
    if (isCollapsed) {
        return change.insertText(indent).focus();
    }

    // We indent all selected lines
    return (0, _changes.indentLines)(opts, change, indent);
}
exports.default = onTab;