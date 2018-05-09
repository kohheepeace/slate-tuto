'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * Return the current code block, from current selection or from a node key.
 */
function getCurrentCode(opts, value, key) {
    var document = value.document;


    var currentBlock = void 0;
    if (key) {
        currentBlock = value.document.getDescendant(key);
    } else {
        if (!value.selection.startKey) return null;
        currentBlock = value.startBlock;
    }

    // The structure is always code_block -> code_line -> text
    // So the parent of the currentBlock should be the code_block
    var parent = document.getParent(currentBlock.key);
    if (parent && parent.type === opts.containerType) {
        return parent;
    }
    return null;
}
exports.default = getCurrentCode;