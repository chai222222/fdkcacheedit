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
      return '\u3010CountNotZero\u3011\n\u2605\u6570\u91CF\uFF1E\uFF10\u3001\u8CDE\u5473\u671F\u9650\u6D88\u8CBB\u3042\u308A\u3001\u540D\u524D\u306B\u671F\u9650\u3092\u542B\u307E\u306A\u3044\n(1) \u7269\u54C1\u540D\u306E\u5148\u982D\u306B\u3010\u8CDE\u5473\u671F\u9650\u3011\u3092\u8FFD\u52A0\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      return quantity > 0 && this._isLimitStr(this._getLimit(zaico)) && !this._isLimitIntTitle(zaico);
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var limit = this._getLimit(zaico);
      zaico.title = '\u3010' + limit + '\u3011' + zaico.title; // (1)
      return zaico;
    }
  }]);

  return CountNotZero;
}(_Base3.default);

exports.default = CountNotZero;
//# sourceMappingURL=CountNotZero.js.map