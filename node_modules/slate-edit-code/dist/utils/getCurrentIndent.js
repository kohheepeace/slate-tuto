'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _getIndent = require('./getIndent');

var _getIndent2 = _interopRequireDefault(_getIndent);

var _getCurrentCode = require('./getCurrentCode');

var _getCurrentCode2 = _interopRequireDefault(_getCurrentCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Detect indentation in the current code block
 */
function getCurrentIndent(opts, value) {
    if (opts.getIndent) {
        return opts.getIndent(value);
    }

    var currentCode = (0, _getCurrentCode2.default)(opts, value);
    if (!currentCode) {
        return '';
    }

    var text = currentCode.getTexts().map(function (t) {
        return t.text;
    }).join('\n');
    return (0, _getIndent2.default)(text);
}

exports.default = getCurrentIndent;