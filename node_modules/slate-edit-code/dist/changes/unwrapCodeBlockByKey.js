'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * Unwrap a code block into a normal block.
 */
function unwrapCodeBlockByKey(opts, change, key, type) {
    var value = change.value;
    var document = value.document;

    // Get the code block

    var codeBlock = document.getDescendant(key);

    if (!codeBlock || codeBlock.type != opts.containerType) {
        throw new Error('Block passed to unwrapCodeBlockByKey should be a code block container');
    }

    // change lines into paragraph
    codeBlock.nodes.forEach(function (line) {
        return change.setNodeByKey(line.key, { type: type }, { normalize: false }).unwrapNodeByKey(line.key, { normalize: false });
    });

    return change;
}
exports.default = unwrapCodeBlockByKey;