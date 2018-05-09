'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(opts, event, change, editor) {
    var value = change.value;

    if (!value.isCollapsed) {
        return undefined;
    }

    event.preventDefault();

    var startBlock = value.startBlock;

    var currentLineText = startBlock.text;
    var indent = (0, _utils.getIndent)(currentLineText, '');

    return change.splitBlock().insertText(indent).focus();
}

exports.default = onEnter;