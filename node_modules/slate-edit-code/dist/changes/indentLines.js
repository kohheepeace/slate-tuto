'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * Indent all lines in selection
 */
function indentLines(opts, change,
// Indent to add
indent) {
    var value = change.value;
    var document = value.document,
        selection = value.selection;

    var lines = document.getBlocksAtRange(selection).filter(function (node) {
        return node.type === opts.lineType;
    });

    return lines.reduce(function (c, line) {
        // Insert an indent at start of line
        var text = line.nodes.first();
        return c.insertTextByKey(text.key, 0, indent);
    }, change);
}
exports.default = indentLines;