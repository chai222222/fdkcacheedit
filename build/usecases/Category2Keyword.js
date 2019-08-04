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

var Category2Keyword = function (_Base) {
  _inherits(Category2Keyword, _Base);

  function Category2Keyword() {
    _classCallCheck(this, Category2Keyword);

    return _possibleConstructorReturn(this, (Category2Keyword.__proto__ || Object.getPrototypeOf(Category2Keyword)).apply(this, arguments));
  }

  _createClass(Category2Keyword, [{
    key: 'description',
    value: function description() {
      return '\u3010Category2Keyword\u3011\n\u2605\u30AB\u30C6\u30B4\u30EA\u306E\u5909\u66F4\n\u30AB\u30C6\u30B4\u30EA\u306B\u3001\u7A7A\u767D\u4EE5\u5916\u3067\u5E74\u6708\u65E5,\u5E74\u6708,\u671F\u9650\u306A\u3057\u4EE5\u5916\u304C\u5165\u3063\u3066\u3044\u308B\u5834\u5408\u306B\u30AB\u30C6\u30B4\u30EA\u306B\u5165\u3063\u3066\u3044\u308B\u3082\u306E\u3092\u30AD\u30FC\u30EF\u30FC\u30C9\u306B\u79FB\u3059\u3002\n\u30AB\u30C6\u30B4\u30EA\u306F\u3001\u8CDE\u5473\u671F\u9650\uFF08\u6D88\u8CBB\uFF09\u306B\u671F\u9650\u5024\u304C\u3042\u308C\u3070\u8A2D\u5B9A\u3059\u308B\u3002\u306A\u3051\u308C\u3070\u304B\u3089\u6587\u5B57\u5217\u306B\u3059\u308B\u3002\n(\u30AB\u30C6\u30B4\u30EA\u306F\u8CDE\u5473\u671F\u9650\u306E\u5E74\u6708\u3002\u306A\u306E\u3067xxxx\u5E74yy\u6708\u306E\u3082\u306E\u306F\u305D\u306E\u307E\u307E)\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // カテゴリ
      var category = zaico.category;

      return typeof category === 'string' && category && !this._isLimitStr(category);
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var category = zaico.category;

      this._optSet(zaico, _Base3.default.OPTION_NAMES.KEYWORD, category);
      var limit = this._getLimit(zaico);
      zaico.category = limit || '';
      return zaico;
    }
  }]);

  return Category2Keyword;
}(_Base3.default);

exports.default = Category2Keyword;
//# sourceMappingURL=Category2Keyword.js.map