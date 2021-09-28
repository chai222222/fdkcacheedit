'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);
  }

  _createClass(Base, [{
    key: 'description',


    /** 日時期限なし文字列 */
    value: function description() {}

    /** 日時フォーマット正規表現 */


    /** optional attributes の name値 */

  }, {
    key: 'isTarget',
    value: function isTarget() {
      return false;
    }
  }, {
    key: 'editOne',
    value: function editOne() {}
  }, {
    key: 'preEdit',
    value: function preEdit() {
      return Promise.resolve();
    }
  }, {
    key: 'toNum',
    value: function toNum(val) {
      if (typeof val === 'number') return val;
      if (typeof val !== 'string') {
        return undefined;
      }
      if (val.length === 0) return 0;
      try {
        return parseInt(val, 10);
      } catch (e) {
        return undefined;
      }
    }
  }, {
    key: '_isLimitStr',
    value: function _isLimitStr(str) {
      return str && Base.DATE_PATTERN.test(str);
    }
  }, {
    key: '_isLimitIntTitle',
    value: function _isLimitIntTitle(zaico) {
      if (typeof zaico.title !== 'string' || !zaico.title) return false;
      var res = /^【([^】]+)】/.exec(zaico.title);
      // if (res) console.log('******', res[0]);
      return res && this._isLimitStr(res[1]);
    }
  }, {
    key: '_getLimit',
    value: function _getLimit(zaico) {
      var limitIndex = this._optIndex(zaico, Base.OPTION_NAMES.LIMIT_DATE);
      return limitIndex >= 0 && zaico.optional_attributes[limitIndex].value || '';
    }
  }, {
    key: '_limitStr2CategoryStr',
    value: function _limitStr2CategoryStr(limit) {
      var m = limit.match(/^(\d+)年(\d+)月/);
      if (!m) m = limit.match(/^(\d{4})(\d{2})\d{2}/);
      if (!m) return limit;
      return m[1] + '\u5E74' + m[2] + '\u6708';
    }
  }, {
    key: '_optIndex',
    value: function _optIndex(zaico, targetName) {
      return Array.isArray(zaico.optional_attributes) ? zaico.optional_attributes.findIndex(function (_ref) {
        var name = _ref.name;
        return name === targetName;
      }) : -1;
    }
  }, {
    key: '_optValue',
    value: function _optValue(zaico, targetName) {
      var idx = this._optIndex(zaico, targetName);
      return idx < 0 ? undefined : zaico.optional_attributes[idx].value;
    }
  }, {
    key: '_optSet',
    value: function _optSet(zaico, targetName, value) {
      if (Array.isArray(zaico.optional_attributes)) {
        var idx = zaico.optional_attributes.findIndex(function (_ref2) {
          var name = _ref2.name;
          return name === targetName;
        });
        if (idx >= 0) {
          zaico.optional_attributes[idx].value = value;
          return;
        }
      } else {
        zaico.optional_attributes = [];
      }
      zaico.optional_attributes.push({ name: targetName, value: value });
    }
  }, {
    key: '_titleWithoutDate',
    value: function _titleWithoutDate(title) {
      return title.replace(/^【[^】]+】 */, '');
    }
  }, {
    key: '_setTitleDate',
    value: function _setTitleDate(zaico, dt) {
      var nTitle = this._titleWithoutDate(zaico.title);
      zaico.title = dt ? '\u3010' + this._formatDate(dt) + '\u3011' + nTitle : nTitle;
    }
  }, {
    key: '_toDate',
    value: function _toDate(str) {
      var mArr = Base.DATE_PATTERN.exec(str);
      if (!Array.isArray(mArr) || mArr.length < 4) return null; // 日時フォーマットに合致しないか期限なし

      var _mArr = _slicedToArray(mArr, 4),
          syear = _mArr[1],
          smonth = _mArr[2],
          sday = _mArr[3];

      var d = new Date(parseInt(syear), parseInt(smonth) - 1, sday === undefined ? 1 : parseInt(sday));
      if (sday === undefined) {
        // year, monthのみ
        d.setMonth(d.getMonth() + 1);
        d.setDate(d.getDate() - 1);
      }
      return d;
    }

    /**
     * 旧日時フォーマット（数値８桁）から Date を作成して返します。
     * @param {String} dtStr 日時文字列
     * @return {Date|null} フォーマットが正しい場合 Date を返し、それ以外は falthy 値を返します。
     */

  }, {
    key: '_toDateOld',
    value: function _toDateOld(dtStr) {
      var str = dtStr.trim();
      var dstr = void 0;
      var fmtIsDate = str.match(/^\d{8}$/) && Date.parse(dstr = str.replace(/^(\d{4})(\d{2})/, '$1/$2/'));
      return fmtIsDate && new Date(dstr);
    }
  }, {
    key: '_formatDate',
    value: function _formatDate(dt) {
      return dt instanceof Date ? [dt.getFullYear(), ('00' + (dt.getMonth() + 1)).slice(-2), ('00' + dt.getDate()).slice(-2)].join('/') : String(dt);
    }
  }, {
    key: '_isJan',
    value: function _isJan(code) {
      var janLengthArr = [8, 13]; // JANの長さ定義
      return typeof code === 'string' && code.match(/^\d+$/) && janLengthArr.includes(code.length);
    }
  }]);

  return Base;
}();

Base.OPTION_NAMES = {
  LIMIT: '賞味期限（消費）',
  LIMIT_DATE: '賞味（消費）期限（日付型）',
  KEYWORD: 'キーワード',
  PLACE_OF_FOODDRIVE: 'フードドライブ場所' };
Base.UNLIMIT_DATE = '期限なし';
Base.DATE_PATTERN = new RegExp('^(\\d{4})[-/\u5E74]?(\\d{2})[-/\u6708]?(\\d{2})?\\D?|^' + Base.UNLIMIT_DATE + '$');
exports.default = Base;
//# sourceMappingURL=Base.js.map