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

var CountNotZero = function (_Base) {
  _inherits(CountNotZero, _Base);

  function CountNotZero() {
    _classCallCheck(this, CountNotZero);

    return _possibleConstructorReturn(this, (CountNotZero.__proto__ || Object.getPrototypeOf(CountNotZero)).apply(this, arguments));
  }

  _createClass(CountNotZero, [{
    key: 'description',
    value: function description() {
      return '\u3010CountNotZero\u3011\n\u2605\u6570\u91CF\uFF1E\uFF10\u3001\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D\u3042\u308A\n(1) \u7269\u54C1\u540D\u306E\u5148\u982D\u306E\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D,\u3010\u8CDE\u5473\u671F\u9650\u3011\u3092\u5024\u306E\u6B63\u898F\u5316\u3092\u884C\u3044\u518D\u8A2D\u5B9A(\u671F\u9650\u306A\u3057\u306E\u307F\u6B63\u898F\u5316\u306F\u3057\u306A\u3044)\n=\n\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u304C\u304A\u304B\u3057\u3044\u5834\u5408\u306B\u306F\u30A8\u30E9\u30FC\u3092\u51FA\u529B\n\nYYYY\u5E74MM\u6708DD => YYYY/MM/DD\nYYYY/MM/DD   => YYYY/MM/DD\nYYYYMMDD     => YYYY/MM/DD\n\u671F\u9650\u306A\u3057     => \u671F\u9650\u306A\u3057\n\n([\u6708/-])DD\u306E\u7701\u7565\u6642\u306F\u3001\u305D\u306E\u6708\u306E\u4E00\u756A\u6700\u5F8C\u306E\u65E5\u306B\u3059\u308B\n\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      var limit = this._getLimit(zaico);
      if (quantity < 1 || !limit) return false; // (1) skip
      if (!this._isLimitStr(limit)) {
        return this._err('フォーマットエラー', zaico, limit);
      }
      var d = this._toDate(limit);
      if (d && d.getTime() < Date.now()) {
        return this._err('古い期限', zaico, limit);
      }
      return true;
    }
  }, {
    key: '_err',
    value: function _err(msg, zaico, limit) {
      var id = zaico.id,
          code = zaico.code,
          title = zaico.title;

      console.error(_Base3.default.OPTION_NAMES.LIMIT_DATE + ': ' + msg, JSON.stringify({ id: id, code: code, title: title, limit: limit }, null, ''));
      return false;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var limit = this._getLimit(zaico);
      var d = this._toDate(limit);
      this._setTitleDate(zaico, d || _Base3.default.UNLIMIT_DATE);
      return zaico;
    }
  }]);

  return CountNotZero;
}(_Base3.default);

exports.default = CountNotZero;
//# sourceMappingURL=CountNotZero.js.map