'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

require('slate');

var _immutable = require('immutable');

var _TOKEN_MARK = require('./TOKEN_MARK');

var _TOKEN_MARK2 = _interopRequireDefault(_TOKEN_MARK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default filter for code blocks
 */
function defaultOnlyIn(node) {
    return node.object === 'block' && node.type === 'code_block';
}

/**
 * Default getter for syntax
 */
function defaultGetSyntax(node) {
    return 'javascript';
}

/**
 * Default rendering for marks
 */
function defaultRenderMark(props) {
    var mark = props.mark;

    if (mark.type !== _TOKEN_MARK2.default) {
        return undefined;
    }
    var className = mark.data.get('className');
    return React.createElement(
        'span',
        { className: className },
        props.children
    );
}

/**
 * The plugin options
 */

var Options = function (_Record) {
    _inherits(Options, _Record);

    function Options() {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    return Options;
}((0, _immutable.Record)({
    onlyIn: defaultOnlyIn,
    getSyntax: defaultGetSyntax,
    renderMark: defaultRenderMark
}));

exports.default = Options;