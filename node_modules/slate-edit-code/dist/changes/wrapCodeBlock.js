'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _wrapCodeBlockByKey = require('./wrapCodeBlockByKey');

var _wrapCodeBlockByKey2 = _interopRequireDefault(_wrapCodeBlockByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap current block into a code block.
 */
function wrapCodeBlock(opts, change) {
    var value = change.value;
    var startBlock = value.startBlock,
        selection = value.selection;

    // Convert to code block

    (0, _wrapCodeBlockByKey2.default)(opts, change, startBlock.key);

    // Move selection back in the block
    change.collapseToStartOf(change.value.document.getDescendant(startBlock.key)).moveOffsetsTo(selection.startOffset);

    return change;
}

exports.default = wrapCodeBlock;