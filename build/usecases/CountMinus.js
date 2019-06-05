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

var CountMinus = function (_Base) {
  _inherits(CountMinus, _Base);

  function CountMinus() {
    _classCallCheck(this, CountMinus);

    return _possibleConstructorReturn(this, (CountMinus.__proto__ || Object.getPrototypeOf(CountMinus)).apply(this, arguments));
  }

  _createClass(CountMinus, [{
    key: 'description',
    value: function description() {
      return '\u3010CountMinus\u3011\n\u2605\u6570\u91CF\uFF1C\uFF10\n(1) \u6570\u91CF\u3092\uFF10\u306B\u3059\u308B\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      return quantity < 0;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      zaico.quantity = '0.0'; // (1)
      return zaico;
    }
  }]);

  return CountMinus;
}(_Base3.default);

exports.default = CountMinus;
//# sourceMappingURL=CountMinus.js.map