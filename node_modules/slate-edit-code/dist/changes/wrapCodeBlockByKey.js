'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Wrap a block into a code block.
 */
function wrapCodeBlockByKey(opts, change, key) {
    var value = change.value;
    var document = value.document;


    var startBlock = document.getDescendant(key);
    var text = startBlock.text;

    // Remove all child
    startBlock.nodes.forEach(function (node) {
        change.removeNodeByKey(node.key, { normalize: false });
    });

    // Insert new text
    var toInsert = (0, _utils.deserializeCode)(opts, text);

    toInsert.nodes.forEach(function (node, i) {
        change.insertNodeByKey(startBlock.key, i, node, { normalize: false });
    });

    // Set node type
    change.setNodeByKey(startBlock.key, {
        type: opts.containerType
    });

    return change;
}

exports.default = wrapCodeBlockByKey;