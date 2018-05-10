(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom/server'), require('slate'), require('immutable')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom/server', 'slate', 'immutable'], factory) :
	(factory((global.SlateHtmlSerializer = {}),global.React,global.ReactDOMServer,global.Slate,global.Immutable));
}(this, (function (exports,React,server,slate,immutable) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

var toString = Object.prototype.toString;

var typeOf = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function'
    case '[object Date]': return 'date'
    case '[object RegExp]': return 'regexp'
    case '[object Arguments]': return 'arguments'
    case '[object Array]': return 'array'
    case '[object String]': return 'string'
  }

  if (typeof val == 'object' && val && typeof val.length == 'number') {
    try {
      if (typeof val.callee == 'function') return 'arguments';
    } catch (ex) {
      if (ex instanceof TypeError) {
        return 'arguments';
      }
    }
  }

  if (val === null) return 'null'
  if (val === undefined) return 'undefined'
  if (val && val.nodeType === 1) return 'element'
  if (val === Object(val)) return 'object'

  return typeof val
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * String.
 *
 * @type {String}
 */

var String = new immutable.Record({
  object: 'string',
  text: ''
});

/**
 * A rule to (de)serialize text nodes. This is automatically added to the HTML
 * serializer so that users don't have to worry about text-level serialization.
 *
 * @type {Object}
 */

var TEXT_RULE = {
  deserialize: function deserialize(el) {
    if (el.tagName && el.tagName.toLowerCase() === 'br') {
      return {
        object: 'text',
        leaves: [{
          object: 'leaf',
          text: '\n'
        }]
      };
    }

    if (el.nodeName == '#text') {
      if (el.nodeValue && el.nodeValue.match(/<!--.*?-->/)) return;

      return {
        object: 'text',
        leaves: [{
          object: 'leaf',
          text: el.nodeValue
        }]
      };
    }
  },
  serialize: function serialize(obj, children) {
    if (obj.object === 'string') {
      return children.split('\n').reduce(function (array, text, i) {
        if (i != 0) array.push(React.createElement('br', { key: i }));
        array.push(text);
        return array;
      }, []);
    }
  }
};

/**
 * A default `parseHtml` function that returns the `<body>` using `DOMParser`.
 *
 * @param {String} html
 * @return {Object}
 */

function defaultParseHtml(html) {
  if (typeof DOMParser === 'undefined') {
    throw new Error('The native `DOMParser` global which the `Html` serializer uses by default is not present in this environment. You must supply the `options.parseHtml` function instead.');
  }

  var parsed = new DOMParser().parseFromString(html, 'text/html');
  var body = parsed.body;

  return body;
}

/**
 * HTML serializer.
 *
 * @type {Html}
 */

var Html =
/**
 * Create a new serializer with `rules`.
 *
 * @param {Object} options
 *   @property {Array} rules
 *   @property {String|Object|Block} defaultBlock
 *   @property {Function} parseHtml
 */

function Html() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, Html);

  _initialiseProps.call(this);

  var _options$defaultBlock = options.defaultBlock,
      defaultBlock = _options$defaultBlock === undefined ? 'paragraph' : _options$defaultBlock,
      _options$parseHtml = options.parseHtml,
      parseHtml = _options$parseHtml === undefined ? defaultParseHtml : _options$parseHtml,
      _options$rules = options.rules,
      rules = _options$rules === undefined ? [] : _options$rules;


  defaultBlock = slate.Node.createProperties(defaultBlock);

  this.rules = [].concat(toConsumableArray(rules), [TEXT_RULE]);
  this.defaultBlock = defaultBlock;
  this.parseHtml = parseHtml;
};

/**
 * Add a unique key to a React `element`.
 *
 * @param {Element} element
 * @return {Element}
 */

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.deserialize = function (html) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$toJSON = options.toJSON,
        toJSON = _options$toJSON === undefined ? false : _options$toJSON;
    var defaultBlock = _this.defaultBlock,
        parseHtml = _this.parseHtml;

    var fragment = parseHtml(html);
    var children = Array.from(fragment.childNodes);
    var nodes = _this.deserializeElements(children);

    // COMPAT: ensure that all top-level inline nodes are wrapped into a block.
    nodes = nodes.reduce(function (memo, node, i, original) {
      if (node.object == 'block') {
        memo.push(node);
        return memo;
      }

      if (i > 0 && original[i - 1].object != 'block') {
        var _block = memo[memo.length - 1];
        _block.nodes.push(node);
        return memo;
      }

      var block = _extends({
        object: 'block',
        data: {},
        isVoid: false
      }, defaultBlock, {
        nodes: [node]
      });

      memo.push(block);
      return memo;
    }, []);

    // TODO: pretty sure this is no longer needed.
    if (nodes.length == 0) {
      nodes = [_extends({
        object: 'block',
        data: {},
        isVoid: false
      }, defaultBlock, {
        nodes: [{
          object: 'text',
          leaves: [{
            object: 'leaf',
            text: '',
            marks: []
          }]
        }]
      })];
    }

    var json = {
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: nodes
      }
    };

    var ret = toJSON ? json : slate.Value.fromJSON(json);
    return ret;
  };

  this.deserializeElements = function () {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var nodes = [];

    elements.filter(_this.cruftNewline).forEach(function (element) {
      var node = _this.deserializeElement(element);
      switch (typeOf(node)) {
        case 'array':
          nodes = nodes.concat(node);
          break;
        case 'object':
          nodes.push(node);
          break;
      }
    });

    return nodes;
  };

  this.deserializeElement = function (element) {
    var node = void 0;

    if (!element.tagName) {
      element.tagName = '';
    }

    var next = function next(elements) {
      if (Object.prototype.toString.call(elements) == '[object NodeList]') {
        elements = Array.from(elements);
      }

      switch (typeOf(elements)) {
        case 'array':
          return _this.deserializeElements(elements);
        case 'object':
          return _this.deserializeElement(elements);
        case 'null':
        case 'undefined':
          return;
        default:
          throw new Error('The `next` argument was called with invalid children: "' + elements + '".');
      }
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        if (!rule.deserialize) continue;
        var ret = rule.deserialize(element, next);
        var type = typeOf(ret);

        if (type != 'array' && type != 'object' && type != 'null' && type != 'undefined') {
          throw new Error('A rule returned an invalid deserialized representation: "' + node + '".');
        }

        if (ret === undefined) {
          continue;
        } else if (ret === null) {
          return null;
        } else if (ret.object == 'mark') {
          node = _this.deserializeMark(ret);
        } else {
          node = ret;
        }

        break;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return node || next(element.childNodes);
  };

  this.deserializeMark = function (mark) {
    var type = mark.type,
        data = mark.data;


    var applyMark = function applyMark(node) {
      if (node.object == 'mark') {
        return _this.deserializeMark(node);
      } else if (node.object == 'text') {
        node.leaves = node.leaves.map(function (leaf) {
          leaf.marks = leaf.marks || [];
          leaf.marks.push({ type: type, data: data });
          return leaf;
        });
      } else {
        node.nodes = node.nodes.map(applyMark);
      }

      return node;
    };

    return mark.nodes.reduce(function (nodes, node) {
      var ret = applyMark(node);
      if (Array.isArray(ret)) return nodes.concat(ret);
      nodes.push(ret);
      return nodes;
    }, []);
  };

  this.serialize = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var document = value.document;

    var elements = document.nodes.map(_this.serializeNode).filter(function (el) {
      return el;
    });
    if (options.render === false) return elements;

    var html = server.renderToStaticMarkup(React.createElement(
      'body',
      null,
      elements
    ));
    var inner = html.slice(6, -7);
    return inner;
  };

  this.serializeNode = function (node) {
    if (node.object === 'text') {
      var leaves = node.getLeaves();
      return leaves.map(_this.serializeLeaf);
    }

    var children = node.nodes.map(_this.serializeNode);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _this.rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var rule = _step2.value;

        if (!rule.serialize) continue;
        var ret = rule.serialize(node, children);
        if (ret === null) return;
        if (ret) return addKey(ret);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    throw new Error('No serializer defined for node of type "' + node.type + '".');
  };

  this.serializeLeaf = function (leaf) {
    var string = new String({ text: leaf.text });
    var text = _this.serializeString(string);

    return leaf.marks.reduce(function (children, mark) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _this.rules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var rule = _step3.value;

          if (!rule.serialize) continue;
          var ret = rule.serialize(mark, children);
          if (ret === null) return;
          if (ret) return addKey(ret);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      throw new Error('No serializer defined for mark of type "' + mark.type + '".');
    }, text);
  };

  this.serializeString = function (string) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _this.rules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var rule = _step4.value;

        if (!rule.serialize) continue;
        var ret = rule.serialize(string, string.text);
        if (ret) return ret;
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  };

  this.cruftNewline = function (element) {
    return !(element.nodeName === '#text' && element.nodeValue == '\n');
  };
};

var key = 0;

function addKey(element) {
  return React.cloneElement(element, { key: key++ });
}

exports.default = Html;

Object.defineProperty(exports, '__esModule', { value: true });

})));
