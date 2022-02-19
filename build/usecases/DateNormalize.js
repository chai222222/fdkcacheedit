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

var DateNormalize = function (_Base) {
  _inherits(DateNormalize, _Base);

  function DateNormalize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateNormalize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateNormalize.__proto__ || Object.getPrototypeOf(DateNormalize)).call.apply(_ref, [this].concat(args))), _this), _this.regIsDateNumOnly = /^(\d{4})(\d{2})(\d{2})$/, _this.regStartDateNumWithBracket = /^【(\d{4})(\d{2})(\d{2})】(.*)$/, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateNormalize, [{
    key: 'description',
    value: function description() {
      return '\u3010DateNormalize\u3011\n\u2605\u65E5\u4ED8\u306E\uFF18\u6841\u6570\u5024\u3092\u6B63\u898F\u5316(YYYY/MM/DD)\n(1) \u30AA\u30D7\u30B7\u30E7\u30F3\u5C5E\u6027(optional_attributes[])\u306Ename\u304C"\u8CDE\u5473\uFF08\u6D88\u8CBB\uFF09\u671F\u9650\uFF08\u65E5\u4ED8\u578B\uFF09"\u306E value \u5024\u5168\u4F53\u6587\u5B57\u5217\u304C\uFF18\u6841\u6570\u5024\u306E\u3082\u306E\u3092\u6B63\u898F\u5316\n(2) title\u304C\u3010\u6570\u5024\uFF18\u6841\u3011\u3067\u59CB\u307E\u3063\u3066\u3044\u308B\u3082\u306E\u3092\u6B63\u898F\u5316\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // カテゴリ
      var title = zaico.title;

      var opt = void 0;
      return typeof title === 'string' && this.regStartDateNumWithBracket.exec(title) || (opt = this._getLimit(zaico)) && this.regIsDateNumOnly.exec(opt);
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var title = zaico.title;

      var opt = void 0,
          res = void 0;
      if (typeof title === 'string' && (res = this.regStartDateNumWithBracket.exec(title))) {
        this._setTitleDate(zaico, res[1] + '/' + res[2] + '/' + res[3]);
      }
      if ((opt = this._getLimit(zaico)) && (res = this.regIsDateNumOnly.exec(opt))) {
        this._optSet(zaico, _Base3.default.OPTION_NAMES.LIMIT_DATE, res[1] + '/' + res[2] + '/' + res[3]);
      }
      return zaico;
    }
  }]);

  return DateNormalize;
}(_Base3.default);

exports.default = DateNormalize;
//# sourceMappingURL=DateNormalize.js.map