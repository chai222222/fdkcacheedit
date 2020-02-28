'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _csv = require('csv');

var _csv2 = _interopRequireDefault(_csv);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CsvEdit = function (_Base) {
  _inherits(CsvEdit, _Base);

  function CsvEdit() {
    _classCallCheck(this, CsvEdit);

    return _possibleConstructorReturn(this, (CsvEdit.__proto__ || Object.getPrototypeOf(CsvEdit)).apply(this, arguments));
  }

  _createClass(CsvEdit, [{
    key: 'preEdit',
    value: function preEdit() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.initCsvDef();
        _fs2.default.createReadStream('20200227エースコック.csv').pipe(_iconvLite2.default.decodeStream('SJIS')).pipe(_iconvLite2.default.encodeStream('UTF-8')).pipe(_csv2.default.parse()).pipe(_csv2.default.transform(function (record) {
          if (this.csvHeader) {
            var ukey = this.getUniquekeyStr(record);
            this.csvData[ukey] = record;
          } else {
            this.csvColumns = record;
            this.csvHeader = record.reduce(function (acc, col, idx) {
              return _extends({}, acc, _defineProperty({}, col, idx));
            }, {});
            this.csvData = {};
          }
          console.log('pipe', record);
        })).on('end', function () {
          return resolve();
        }).on('error', function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'getUniquekeyStr',
    value: function getUniquekeyStr(record) {
      var _this3 = this;

      var err = function err(s) {
        throw new Error('CSV\u5B9A\u7FA9\u30D5\u30A1\u30A4\u30EB(uniquekey)\uFF1A' + s);
      };
      return this.csvdef.uniquekey.map(function (col) {
        if (!col || _this3.csvHeader[col] === undefined) err('カラム文字列が不正です');
        return record[_this3.csvHeader[col]];
      }).join(':');
    }
  }, {
    key: 'initCsvDef',
    value: function initCsvDef() {
      this.csvdef = JSON.parse(_fs2.default.readFileSync(CsvEdit.CSV_DEFINE_FILE, 'utf-8'));
      var err = function err(s) {
        throw new Error('CSV\u5B9A\u7FA9\u30D5\u30A1\u30A4\u30EB\uFF1A' + s);
      };
      if (typeof this.csvdef.input !== 'string') err('inputがStringではありません');
      if (!_fs2.default.exists(this.csvdef.input)) err('inputファイルが存在しません');
      if (_typeof(this.csvdef.mapping) !== 'object') err('mappingがObjectではありません');
      if (!Array.isArray(this.csvdef.uniquekey)) err('uniquekeyがArrayではありません');
      if (!this.csvdef.uniquekey.length) err('uniquekeyの要素がありません');
      if (!Array.isArray(this.csvdef.update)) err('updateがArrayではありません');
      if (!Array.isArray(this.csvdef.delete)) err('deleteがArrayではありません');
    }
  }, {
    key: 'zaicoUniquekeyStr',
    value: function zaicoUniquekeyStr(zaico) {
      var _this4 = this;

      return this.csvdef.uniquekey.map(function (col) {
        return '' + _this4.zaicoValue(zaico, col);
      }).join(':');
    }
  }, {
    key: 'zaicoPath',
    value: function zaicoPath(col) {
      var err = function err(s) {
        throw new Error('CSV\u5B9A\u7FA9\u30D5\u30A1\u30A4\u30EB(update)\uFF1A' + s);
      };
      if (this.csvdef.mapping[col] === undefined) err('\u30AB\u30E9\u30E0[' + col + ']\u304Cmapping\u306B\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u307E\u305B\u3093');
      return this.csvdef.mapping[col].replace('{key}', col);
    }
  }, {
    key: 'zaicoValue',
    value: function zaicoValue(zaico, col) {
      return _jsonpath2.default.query(zaico, this.zaicoPath(col));
    }
  }, {
    key: 'description',
    value: function description() {
      return '\u3010CsvEdit\u3011\n\u2605CSV\u30D5\u30A1\u30A4\u30EB\u306E\u30C7\u30FC\u30BF\n(1) \u66F4\u65B0\u30C7\u30FC\u30BF\u304C zaico \u306E\u5024\u3068\u9055\u3046\u5834\u5408\u4E0A\u66F8\u304D\n(2) \u524A\u9664\u6307\u5B9A\u30C7\u30FC\u30BF\u304C\u3042\u308B\u5834\u5408\u3001\u524A\u9664\u7528\u30C7\u30FC\u30BF\u3092\u4F5C\u6210\n';
    }
  }, {
    key: 'isUpdateTarget',
    value: function isUpdateTarget(zaico) {
      var _this5 = this;

      var uperr = function uperr(s) {
        throw new Error('CSV\u5B9A\u7FA9\u30D5\u30A1\u30A4\u30EB(update)\uFF1A' + s);
      };
      return this.csvdef.update.some(function (col) {
        var key = _this5.zaicoUniquekeyStr(zaico);
        var record = _this5.csvData[key];
        if (record === undefined) uperr('csv\u30C7\u30FC\u30BF\u306B\u30AD\u30FC[' + key + ']\u304C\u5B58\u5728\u3057\u307E\u305B\u3093');
        var val = record[_this5.csvHeader[col]];
        var zval = _this5.zaicoValue(zaico, col);
        if (!zval) return false;
        if (typeof zval === 'number') return parseInt(val, 10) !== zval;
        if (typeof zval === 'string') return val !== zval;
        return false; // 数値・文字列以外は現状更新させない
      });
    }
  }, {
    key: 'isDeleteTarget',
    value: function isDeleteTarget(zaico) {
      var _this6 = this;

      var delerr = function delerr(s) {
        throw new Error('CSV\u5B9A\u7FA9\u30D5\u30A1\u30A4\u30EB(delete)\uFF1A' + s);
      };
      return this.csvdef.delete.some(function (delInfo) {
        if (typeof delInfo.column !== 'string') delerr('column\u5B9A\u7FA9\u304C\u4E0D\u6B63\u3067\u3059(column)');
        if (typeof delInfo.regexp !== 'string') delerr('column\u5B9A\u7FA9\u304C\u4E0D\u6B63\u3067\u3059(regexp)');
        var re = new RegExp(delInfo.regexp);
        var zval = _this6.zaicoValue(zaico, col);
        return re.test('' + zval);
      });
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      return this.isUpdateTarget(zaico) || this.isDeleteTarget(zaico);
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      var _this7 = this;

      if (this.isDeleteTarget(zaico)) {
        return { id: zaico.id };
      }
      // update
      return this.csvdef.update.reduce(function (acc, col) {
        var v = _this7.csvData[_this7.zaicoUniquekeyStr()][_this7.csvHeader[col]];
        var zv = _this7.zaicoValue(zaico, col);
        if (v != zv) _jsonpath2.default.value(acc, _this7.zaicoPath(col), typeof zv === 'number' ? parseInt(v) : v);
        return acc;
      }, zaico);
    }
  }]);

  return CsvEdit;
}(_Base3.default);

CsvEdit.CSV_DEFINE_FILE = './csv_define.json';
exports.default = CsvEdit;
//# sourceMappingURL=CsvEdit.js.map