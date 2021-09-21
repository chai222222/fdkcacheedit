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

var CountZero = function (_Base) {
  _inherits(CountZero, _Base);

  function CountZero() {
    _classCallCheck(this, CountZero);

    return _possibleConstructorReturn(this, (CountZero.__proto__ || Object.getPrototypeOf(CountZero)).apply(this, arguments));
  }

  _createClass(CountZero, [{
    key: 'description',
    value: function description() {
      return '\u3010CountZero\u3011\n\u2605\u6570\u91CF\uFF1C\uFF11 \u3001\u300C\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09\u300D\u304C\u5024\u3092\u6301\u3064\u3082\u306E\n(1) \u7269\u54C1\u540D\u306E\u5148\u982D\u306E\u3010\u8CDE\u5473\u671F\u9650\u3011\u3092\u524A\u9664\n(2) \u8CDE\u5473\u671F\u9650\uFF08\u6D88\u8CBB\uFF09\u306E\u6570\u5B57\u3092\u524A\u9664\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      var limit = this._optValue(zaico, _Base3.default.OPTION_NAMES.LIMIT_DATE);
      return quantity < 1 && typeof limit === 'string' && limit;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      zaico.title = this._titleWithoutDate(zaico.title); // (1)
      this._optSet(zaico, _Base3.default.OPTION_NAMES.LIMIT_DATE, null); // (2)
      return zaico;
    }
  }]);

  return CountZero;
}(_Base3.default);

exports.default = CountZero;
//# sourceMappingURL=CountZero.js.map