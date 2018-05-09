'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * Test if current selection is in a code block.
 */
function isInCodeBlock(opts, value) {
    var document = value.document,
        startKey = value.startKey;

    var codeBlock = document.getClosest(startKey, function (block) {
        return block.type === opts.containerType;
    });

    return Boolean(codeBlock);
}

exports.default = isInCodeBlock;