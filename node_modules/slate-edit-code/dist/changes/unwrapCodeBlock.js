'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _unwrapCodeBlockByKey = require('./unwrapCodeBlockByKey');

var _unwrapCodeBlockByKey2 = _interopRequireDefault(_unwrapCodeBlockByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert a code block to a normal block.
 */
function unwrapCodeBlock(opts, change, type) {
    var value = change.value;


    var codeBlock = (0, _utils.getCurrentCode)(opts, value);

    if (!codeBlock) {
        return change;
    }

    // Convert to paragraph
    (0, _unwrapCodeBlockByKey2.default)(opts, change, codeBlock.key, type);

    return change;
}
exports.default = unwrapCodeBlock;