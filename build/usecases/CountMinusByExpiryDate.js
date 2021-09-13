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

var CountMinusByExpiryDate = function (_Base) {
  _inherits(CountMinusByExpiryDate, _Base);

  function CountMinusByExpiryDate() {
    _classCallCheck(this, CountMinusByExpiryDate);

    var _this = _possibleConstructorReturn(this, (CountMinusByExpiryDate.__proto__ || Object.getPrototypeOf(CountMinusByExpiryDate)).call(this));

    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    _this._today = today;
    return _this;
  }

  _createClass(CountMinusByExpiryDate, [{
    key: 'description',
    value: function description() {
      return '\u3010CountMinusByExpiryDate\u3011\n\u2605\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D\u304C\u7A7A\u3067\u300C\u8CDE\u5473\u671F\u9650\uFF08\u6D88\u8CBB\uFF09\u300D\u304C\u5165\u3063\u3066\u3044\u308B\u5834\u5408\n(1) \u65E5\u4ED8\u3092\u65E5\u4ED8\u578B\u306B\u30B3\u30D4\u30FC\u3059\u308B(\u300C\u8CDE\u5473\u671F\u9650\uFF08\u6D88\u8CBB\uFF09\u300D=>\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D)\n(2) \u671F\u9650\u304C\u904E\u53BB\u3067\u3042\u308C\u3070\u6570\u5024\u3092\uFF10\u306B\u3057\u3001\u30BF\u30A4\u30C8\u30EB\u304B\u3089\u524A\u9664\u3059\u308B\n(3) \u65E5\u4ED8\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u304C\u304A\u304B\u3057\u3044\u5834\u5408(8\u6841\u6570\u5024\u3067\u306F\u306A\u3044\u3001\u65E5\u4ED8\u5024\u3068\u3057\u3066\u3042\u308A\u3048\u306A\u3044\u306A\u3069)\u306E\u5834\u5408\u306B\u306F\u30A8\u30E9\u30FC\u3092\u51FA\u3059\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      var limit = this._optValue(zaico, _Base3.default.OPTION_NAMES.LIMIT);
      var limitDate = this._optValue(zaico, _Base3.default.OPTION_NAMES.LIMIT_DATE);
      if (limitDate || !limit) return false;
      if (!this._toDate(limit)) {
        console.log('[' + zaico.title + '] \u65E5\u4ED8\u4E0D\u6B63(skip) [id:' + zaico.id + ', code:' + zaico.code + ']'); // (3)
        return false;
      }
      return true;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var d = this._toDate(this._optValue(zaico, _Base3.default.OPTION_NAMES.LIMIT));
      this._optSet(zaico, _Base3.default.OPTION_NAMES.LIMIT_DATE, this._formatDate(d));
      // this._optSet(zaico, Base.OPTION_NAMES.LIMIT, '');
      if (d < this._today) {
        zaico.quantity = '0.0'; // (2)
        this._setTitleDate(zaico);
      } else {
        this._setTitleDate(zaico, d);
      }
      return zaico;
    }
  }]);

  return CountMinusByExpiryDate;
}(_Base3.default);

exports.default = CountMinusByExpiryDate;
//# sourceMappingURL=CountMinusByExpiryDate.js.map