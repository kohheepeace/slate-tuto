'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _handlers = require('./handlers');

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Slate plugin to handle keyboard events in code blocks.
 */

function EditCode() {
    var optsParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opts = new _options2.default(optsParam);

    var corePlugin = (0, _core2.default)(opts);
    return _extends({}, corePlugin, {

        onKeyDown: _handlers.onKeyDown.bind(null, opts),
        onPaste: _handlers.onPaste.bind(null, opts)
    });
}

exports.default = EditCode;