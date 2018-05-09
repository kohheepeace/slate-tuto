'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _immutable = require('immutable');

var _detectNewline = require('detect-newline');

var _detectNewline2 = _interopRequireDefault(_detectNewline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_NEWLINE = '\n';

/**
 * Deserialize a text into a code block
 */

function deserializeCode(opts, text) {
    var sep = (0, _detectNewline2.default)(text) || DEFAULT_NEWLINE;

    var lines = (0, _immutable.List)(text.split(sep)).map(function (line) {
        return _slate.Block.create({
            type: opts.lineType,
            nodes: [_slate.Text.create(line)]
        });
    });

    var code = _slate.Block.create({
        type: opts.containerType,
        nodes: lines
    });

    return code;
}

exports.default = deserializeCode;