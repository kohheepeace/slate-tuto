'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(opts, event, change, editor) {
    var value = change.value;

    event.preventDefault();

    var currentCode = (0, _utils.getCurrentCode)(opts, value);
    return change.collapseToStartOf(currentCode.getFirstText()).extendToEndOf(currentCode.getLastText());
}

exports.default = onSelectAll;