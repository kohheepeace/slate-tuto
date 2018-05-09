'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _utils = require('./utils');

var _changes = require('./changes');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The core of the plugin, which does not relies on `slate-react`, and includes
 * everything but behavior and rendering logic.
 */
function core(optsParam) {
    var opts = new _options2.default(optsParam);

    return {
        schema: (0, _validation.schema)(opts),

        changes: {
            unwrapCodeBlockByKey: _changes.unwrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlockByKey: _changes.wrapCodeBlockByKey.bind(null, opts),
            wrapCodeBlock: _changes.wrapCodeBlock.bind(null, opts),
            unwrapCodeBlock: _changes.unwrapCodeBlock.bind(null, opts),
            toggleCodeBlock: _changes.toggleCodeBlock.bind(null, opts)
        },

        utils: {
            isInCodeBlock: _utils.isInCodeBlock.bind(null, opts),
            deserializeCode: _utils.deserializeCode.bind(null, opts)
        }
    };
}

exports.default = core;