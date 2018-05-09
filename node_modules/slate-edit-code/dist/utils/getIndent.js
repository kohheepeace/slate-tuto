'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _detectIndent = require('detect-indent');

var _detectIndent2 = _interopRequireDefault(_detectIndent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 */

function getIndent(text) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_INDENTATION;

    return (0, _detectIndent2.default)(text).indent || defaultValue;
}

exports.default = getIndent;