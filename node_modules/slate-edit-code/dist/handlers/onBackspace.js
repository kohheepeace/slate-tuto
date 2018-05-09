'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _endsWith = require('ends-with');

var _endsWith2 = _interopRequireDefault(_endsWith);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
function onBackspace(opts, event, change, editor) {
    var value = change.value;

    if (value.isExpanded) {
        return undefined;
    }

    var startOffset = value.startOffset,
        startText = value.startText;


    var currentLine = value.startBlock;

    // Detect and remove indentation at cursor
    var indent = (0, _utils.getCurrentIndent)(opts, value);
    var beforeSelection = currentLine.text.slice(0, startOffset);

    // If the line before selection ending with the indentation?
    if ((0, _endsWith2.default)(beforeSelection, indent)) {
        // Remove indent
        event.preventDefault();

        return change.deleteBackward(indent.length).focus();
    } else if (opts.exitBlockType) {
        // Otherwise check if we are in an empty code container...
        var currentCode = (0, _utils.getCurrentCode)(opts, value);
        var isStartOfCode = startOffset === 0 && currentCode.getFirstText() === startText;
        // PERF: avoid checking for whole currentCode.text
        var isEmpty = currentCode.nodes.size === 1 && currentLine.text.length === 0;

        if (isStartOfCode && isEmpty) {
            event.preventDefault();
            // Convert it to default exit type
            return change.setBlocks(opts.exitBlockType, { normalize: false }).unwrapNodeByKey(currentLine.key);
        }
    }
    return undefined;
}

exports.default = onBackspace;