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

var DeleteFoodDrivePlace = function (_Base) {
  _inherits(DeleteFoodDrivePlace, _Base);

  function DeleteFoodDrivePlace() {
    _classCallCheck(this, DeleteFoodDrivePlace);

    return _possibleConstructorReturn(this, (DeleteFoodDrivePlace.__proto__ || Object.getPrototypeOf(DeleteFoodDrivePlace)).apply(this, arguments));
  }

  _createClass(DeleteFoodDrivePlace, [{
    key: 'description',
    value: function description() {
      return '\u3010DeleteFoodDrivePlace\u3011\n\u2605\u30AA\u30D7\u30B7\u30E7\u30F3\u5C5E\u6027\u306E name \u304C "' + _Base3.default.OPTION_NAMES.PLACE_OF_FOODDRIVE + '" \u3067 value \u304C\u6587\u5B57\u5217\u3067\u5B58\u5728\u3059\u308B\u5834\u5408\u3002\n(1) value\u3092 "" \u306B\u3059\u308B\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      var place = this._optValue(zaico, _Base3.default.OPTION_NAMES.PLACE_OF_FOODDRIVE);
      return typeof place === 'string' && place.length > 0;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      this._optSet(zaico, _Base3.default.OPTION_NAMES.PLACE_OF_FOODDRIVE, '');
      return zaico;
    }
  }]);

  return DeleteFoodDrivePlace;
}(_Base3.default);

exports.default = DeleteFoodDrivePlace;
//# sourceMappingURL=DeleteFoodDrivePlace.js.map