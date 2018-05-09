'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slate = require('slate');

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULTS = {
    containerType: 'code_block',
    lineType: 'code_line',
    exitBlockType: 'paragraph',
    selectAll: true,
    allowMarks: false,
    getIndent: null,
    onExit: null
};

/**
 * The plugin options container
 */

var Options = function (_Record) {
    _inherits(Options, _Record);

    function Options() {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    _createClass(Options, [{
        key: 'resolvedOnExit',
        value: function resolvedOnExit(change) {
            if (this.onExit) {
                // Custom onExit option
                return this.onExit(change);
            }
            // Default behavior: insert an exit block
            var range = change.value.selection;

            var exitBlock = _slate.Block.create({
                type: this.exitBlockType,
                nodes: [_slate.Text.create()]
            });

            change.deleteAtRange(range, { normalize: false });
            change.insertBlockAtRange(change.value.selection, exitBlock, {
                normalize: false
            });
            // Exit the code block
            change.unwrapNodeByKey(exitBlock.key);

            return change.collapseToStartOf(exitBlock);
        }
    }]);

    return Options;
}((0, _immutable.Record)(DEFAULTS));

exports.default = Options;