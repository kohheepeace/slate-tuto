'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(opts, event, change, editor) {
    var value = change.value;

    if (!value.isCollapsed) {
        return undefined;
    }

    event.preventDefault();

    // Exit the code block
    return opts.resolvedOnExit(change);
}
exports.default = onModEnter;