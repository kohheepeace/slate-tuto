'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * Dedent all lines in selection
 */
function dedentLines(opts, change,
// Indent to remove
indent) {
    var value = change.value;
    var document = value.document,
        selection = value.selection;

    var lines = document.getBlocksAtRange(selection).filter(function (node) {
        return node.type === opts.lineType;
    });

    return lines.reduce(function (c, line) {
        // Remove a level of indent from the start of line
        var text = line.nodes.first();
        var lengthToRemove = text.characters.takeWhile(function (char, index) {
            return indent.charAt(index) === char.text;
        }).count();
        return c.removeTextByKey(text.key, 0, lengthToRemove);
    }, change);
}
exports.default = dedentLines;