'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    value: function description() {}
  }, {
    key: 'isTarget',
    value: function isTarget() {
      return false;
    }
  }, {
    key: 'editOne',
    value: function editOne() {}
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
      return str && /^\d+年\d+月|^\d{8}$|^期限なし$/.test(str);
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
      var limitIndex = this._optIndex(zaico, Base.OPTION_NAMES.LIMIT);
      return limitIndex >= 0 && zaico.optional_attributes[limitIndex].value || '';
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
  }]);

  return Base;
}();

Base.OPTION_NAMES = {
  LIMIT: '賞味期限（消費）',
  KEYWORD: 'キーワード'
};
exports.default = Base;
//# sourceMappingURL=Base.js.map