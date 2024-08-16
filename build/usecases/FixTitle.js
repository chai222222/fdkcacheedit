'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 先頭１文字を半角にする(全角英数字記号が前提)
var toFirstCharHarfWidthFunc = function toFirstCharHarfWidthFunc(s) {
  return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
};
// 文字列中の全角英数字ドットを半角にする
var toHarfWidthAlnumDotFunc = function toHarfWidthAlnumDotFunc(s) {
  return s.replace(/[０-９Ａ-Ｚａ-ｚ．]/g, toFirstCharHarfWidthFunc);
};

var FixTitle = function (_Base) {
  _inherits(FixTitle, _Base);

  function FixTitle() {
    _classCallCheck(this, FixTitle);

    return _possibleConstructorReturn(this, (FixTitle.__proto__ || Object.getPrototypeOf(FixTitle)).apply(this, arguments));
  }

  _createClass(FixTitle, [{
    key: 'description',
    value: function description() {
      return '\u3010FixTitle\u3011\n\u2605\u30BF\u30A4\u30C8\u30EB\u306E\u4E00\u62EC\u88DC\u6B63\u3092\u884C\u3046\n(1) \u65E5\u4ED8\u4EE5\u5916\u306E\u5148\u982D\u306E \u3010\uFF5E\u3011\u3092\u524A\u9664\u3059\u308B\n(2) \u672B\u5C3E\u304C\u3001\u7A7A\u767D\uFF0B\u6570\u5024(\u5168\u89D2\u534A\u89D2) \uFF0B \u82F1\u5B57(\u5168\u89D2\u534A\u89D2) or \u82F1\u6570\u5B57\u4EE5\u5916 \u306E\u5834\u5408\u306E\u82F1\u6570\u5B57\u306E\u534A\u89D2\u5316\n(3) \u672B\u5C3E\u304C\u3001\u534A\u89D2\u5185\u5BB9\u91CF(\u6570\u5024(\u534A\u89D2) \uFF0B \u82F1\u5B57(\u534A\u89D2) or \u82F1\u6570\u5B57\u4EE5\u5916)\u306B\u3001\u7A7A\u767D + \u534A\u89D2\u5185\u5BB9\u91CF\u304C\u7D9A\u304F\u5834\u5408\u306B\u3001\u534A\u89D2\u5185\u5BB9\u91CF\uFF11\u3064\u306B\u52A0\u5DE5\n';
    }
  }, {
    key: 'changeTitle',
    value: function changeTitle(title) {
      return title.replace(/^【(?!\d{4}\/\d{2}\/\d{2})[^】]*】/, '') // (1) の対応
      .replace(/\s+[0-9０-９]+[A-Za-zＡ-Ｚａ-ｚ]+$/, toHarfWidthAlnumDotFunc) // (2)
      .replace(/([0-9]+[^0-9]+) \1$/, '$1');
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // タイトル
      var title = this.changeTitle(zaico.title);
      return title !== zaico.title;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      zaico.title = this.changeTitle(zaico.title); // (1)
      return zaico;
    }
  }]);

  return FixTitle;
}(_Base3.default);

exports.default = FixTitle;
//# sourceMappingURL=FixTitle.js.map