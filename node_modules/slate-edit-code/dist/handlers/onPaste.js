'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _slateReact = require('slate-react');

var _utils = require('../utils');

/**
 * User is pasting content, insert it as text
 */
function onPaste(opts, event, change, editor) {
    var value = change.value;

    var data = (0, _slateReact.getEventTransfer)(event);
    var currentCode = (0, _utils.getCurrentCode)(opts, value);

    // Only handle paste when selection is completely a code block
    var endBlock = value.endBlock;

    if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
        return undefined;
    }

    // Convert to text if needed
    var text = void 0;
    if (data.type === 'fragment') {
        text = data.fragment.getTexts().map(function (t) {
            return t.text;
        }).join('\n');
    } else {
        text = data.text;
    }

    // Convert the text to code lines
    var lines = (0, _utils.deserializeCode)(opts, text).nodes;

    var fragment = _slate.Document.create({ nodes: lines });

    return change.insertFragment(fragment);
}
exports.default = onPaste;