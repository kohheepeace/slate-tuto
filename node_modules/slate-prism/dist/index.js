'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

require('slate');

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _TOKEN_MARK = require('./TOKEN_MARK');

var _TOKEN_MARK2 = _interopRequireDefault(_TOKEN_MARK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Slate plugin to highlight code syntax.
 */
function PrismPlugin() {
    var optsParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opts = new _options2.default(optsParam);

    return {
        decorateNode: function decorateNode(node) {
            if (!opts.onlyIn(node)) {
                return undefined;
            }
            return _decorateNode(opts, node);
        },

        renderMark: opts.renderMark,

        TOKEN_MARK: _TOKEN_MARK2.default
    };
}

/**
 * Returns the decoration for a node
 */
function _decorateNode(opts, block) {
    var grammarName = opts.getSyntax(block);
    var grammar = _prismjs2.default.languages[grammarName];
    if (!grammar) {
        // Grammar not loaded
        return [];
    }

    // Tokenize the whole block text
    var texts = block.getTexts();
    var blockText = texts.map(function (t) {
        return t.text;
    }).join('\n');
    var tokens = _prismjs2.default.tokenize(blockText, grammar);

    // The list of decorations to return
    var decorations = [];
    var textStart = 0;
    var textEnd = 0;

    texts.forEach(function (text) {
        textEnd = textStart + text.text.length;

        var offset = 0;

        function processToken(token, accu) {
            accu = accu || '';

            if (typeof token === 'string') {
                if (accu) {
                    var decoration = createDecoration({
                        text: text,
                        textStart: textStart,
                        textEnd: textEnd,
                        start: offset,
                        end: offset + token.length,
                        className: 'prism-token token ' + accu
                    });
                    if (decoration) {
                        decorations.push(decoration);
                    }
                }
                offset += token.length;
            } else {
                accu = accu + ' ' + token.type + ' ' + (token.alias || '');

                if (typeof token.content === 'string') {
                    var _decoration = createDecoration({
                        text: text,
                        textStart: textStart,
                        textEnd: textEnd,
                        start: offset,
                        end: offset + token.content.length,
                        className: 'prism-token token ' + accu
                    });
                    if (_decoration) {
                        decorations.push(_decoration);
                    }

                    offset += token.content.length;
                } else {
                    // When using token.content instead of token.matchedStr, token can be deep
                    for (var i = 0; i < token.content.length; i += 1) {
                        processToken(token.content[i], accu);
                    }
                }
            }
        }

        tokens.forEach(processToken);
        textStart = textEnd + 1; // account for added `\n`
    });

    return decorations;
}

/**
 * Return a decoration range for the given text.
 */
function createDecoration(_ref) {
    var text = _ref.text,
        textStart = _ref.textStart,
        textEnd = _ref.textEnd,
        start = _ref.start,
        end = _ref.end,
        className = _ref.className;

    if (start >= textEnd || end <= textStart) {
        // Ignore, the token is not in the text
        return null;
    }

    // Shrink to this text boundaries
    start = Math.max(start, textStart);
    end = Math.min(end, textEnd);

    // Now shift offsets to be relative to this text
    start -= textStart;
    end -= textStart;

    return {
        anchorKey: text.key,
        anchorOffset: start,
        focusKey: text.key,
        focusOffset: end,
        marks: [{ type: 'prism-token', data: { className: className } }]
    };
}

exports.default = PrismPlugin;