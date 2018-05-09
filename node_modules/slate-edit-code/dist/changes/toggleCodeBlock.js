'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _wrapCodeBlock = require('./wrapCodeBlock');

var _wrapCodeBlock2 = _interopRequireDefault(_wrapCodeBlock);

var _unwrapCodeBlock = require('./unwrapCodeBlock');

var _unwrapCodeBlock2 = _interopRequireDefault(_unwrapCodeBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Toggle code block / paragraph.
 */
function toggleCodeBlock(opts, change,
// When toggling a code block off, type to convert to
type) {
    if ((0, _utils.isInCodeBlock)(opts, change.value)) {
        return (0, _unwrapCodeBlock2.default)(opts, change, type);
    }
    return (0, _wrapCodeBlock2.default)(opts, change);
}

exports.default = toggleCodeBlock;