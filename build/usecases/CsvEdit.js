'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _csv = require('csv');

var _csv2 = _interopRequireDefault(_csv);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CsvEdit = function (_Base) {
  _inherits(CsvEdit, _Base);

  function CsvEdit() {
    _classCallCheck(this, CsvEdit);

    var _this = _possibleConstructorReturn(this, (CsvEdit.__proto__ || Object.getPrototypeOf(CsvEdit)).call(this));

    _this.loadCsv();
    return _this;
  }

  _createClass(CsvEdit, [{
    key: 'loadCsv',
    value: function loadCsv() {
      _fs2.default.createReadStream('20200227エースコック.csv').pipe(_iconvLite2.default.decodeStream('SJIS')).pipe(_iconvLite2.default.encodeStream('UTF-8')).pipe(_csv2.default.parse()).pipe(_csv2.default.transform(function (record) {
        console.log('pipe', record);
      }));
    }
  }, {
    key: 'description',
    value: function description() {
      return '\u3010CsvEdit\u3011\n\u2605CSV\u30D5\u30A1\u30A4\u30EB\u306E\u30C7\u30FC\u30BF\n(1) \u66F4\u65B0\u30C7\u30FC\u30BF\u304C zaico \u306E\u5024\u3068\u9055\u3046\u5834\u5408\u4E0A\u66F8\u304D\n(2) \u524A\u9664\u6307\u5B9A\u30C7\u30FC\u30BF\u304C\u3042\u308B\u5834\u5408\u3001\u524A\u9664\u7528\u30C7\u30FC\u30BF\u3092\u4F5C\u6210\n';
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

  return CsvEdit;
}(_Base3.default);

exports.default = CsvEdit;
//# sourceMappingURL=CsvEdit.js.map