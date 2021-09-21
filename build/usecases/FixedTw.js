'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _JSONStream = require('JSONStream');

var _JSONStream2 = _interopRequireDefault(_JSONStream);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FixedTw = function (_Base) {
  _inherits(FixedTw, _Base);

  function FixedTw() {
    _classCallCheck(this, FixedTw);

    return _possibleConstructorReturn(this, (FixedTw.__proto__ || Object.getPrototypeOf(FixedTw)).apply(this, arguments));
  }

  _createClass(FixedTw, [{
    key: 'description',
    value: function description() {
      return '\u3010FixedTw\u3011\n\u2605code\u304Ctw\u3067\u306F\u3058\u307E\u308B\u30C7\u30FC\u30BF\n(1) code\u306E\u5024\u3092JAN\u3067\u6B63\u3057\u3044\u3082\u306E\u3092\u691C\u7D22\u3057\u3066\u7F6E\u304D\u63DB\u3048\u308B\n\n\u6B63\u3057\u3044\u3082\u306E\u306F\u7269\u54C1\u540D\u304B\u3089\u65E5\u4ED8\u3092\u5916\u3057\u3066\u3001\u5168\u30C7\u30FC\u30BF\u304B\u3089jan\u304Ctw\u3067\u59CB\u307E\u3089\u306A\u3044\u3082\u306E\u3067\u7269\u54C1\u540D\u304B\u3089\u65E5\u4ED8\u3092\u5916\u305F\u6700\u77ED\u4E00\u81F4\u3057\u305F\u3082\u306E\u3002\nJAN\u306F\uFF18\u6841\u3001\uFF11\uFF13\u6841\u306E\u6570\u5024\u6587\u5B57\u5217\u3002\n';
    }
  }, {
    key: 'preEdit',
    value: function preEdit(targetFile) {
      var _this2 = this;

      this.twMap = {};
      var normalMap = {}; // normalMap[[先頭１文字][title] = [ { code(String) twで始まらないcode, id } ]
      return new Promise(function (resolve, reject) {
        var is = _fs2.default.createReadStream(targetFile, 'utf-8');
        is.pipe(_JSONStream2.default.parse('*')).on('data', function (zaico) {
          var title = _this2._titleWithoutDate(zaico.title);
          var code = zaico.code,
              id = zaico.id;

          if (_this2._isJan(code)) {
            // codeが文字列値が入っていないものは無視する
            var firstChar = title.charAt(0);
            var path = '[\'' + firstChar + '\'][\'' + title + '\']';
            var val = _lodash2.default.get(normalMap, path, []); // 完全一致が存在するので配列で持つ
            _lodash2.default.set(normalMap, path, [].concat(_toConsumableArray(val), [{ code: code, id: id }]));
          } else if (typeof code === 'string' && code.startsWith('tw')) {
            // zaico自動設定
            _this2.twMap[id] = { title: title, code: code };
          }
        }).on('error', function (e) {
          reject(e);
        }).on('end', function () {
          var nMap = FixedTw._normalizeCodeMap(normalMap); // normalMap[[先頭１文字][title] = code(String) twで始まらないcode
          _lodash2.default.toPairs(_this2.twMap).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                id = _ref2[0],
                vmap = _ref2[1];

            var firstChar = vmap.title.charAt(0);
            var title2code = _lodash2.default.get(nMap, '[\'' + firstChar + '\']', {});
            vmap.newCode = Object.keys(title2code).sort().reverse().reduce(function (acc, tit) {
              return tit.startsWith(vmap.title) ? title2code[tit] : acc;
            }, undefined);
          });
          _lodash2.default.toPairs(_this2.twMap).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                id = _ref4[0],
                vmap = _ref4[1];

            if (!vmap.newCode) {
              var info = Object.assign(_extends({ id: id }, vmap));
              console.error('修復不可', JSON.stringify(info, null, ''));
            }
          });
          resolve();
        });
      });
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      // 数量
      var quantity = this.toNum(zaico.quantity);
      if (quantity === undefined) {
        return false; // 初期導入データなのでスキップ
      }
      return this.twMap[zaico.id] && this.twMap[zaico.id].newCode;
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      zaico.code = this.twMap[zaico.id].newCode;
      return zaico;
    }
  }], [{
    key: '_normalizeCodeMap',


    /**
     * 完全にタイトルが一致して jan フォーマットが正しいデータを除去し、単一コードのみを作成する。
     * map[char][title] = [{ id, code }];
     * @param {Object} map 正しいデータのマップ
     */
    value: function _normalizeCodeMap(map) {
      return Object.keys(map).reduce(function (nmap, key) {
        if (Array.isArray(map[key])) {
          if (map[key].length === 1) {
            nmap[key] = map[key][0].code;
          } else {
            console.error('タイトルが一致していてJANが正しいものが複数あります', key, JSON.stringify(map[key], null, ''));
          }
        } else {
          nmap[key] = FixedTw._normalizeCodeMap(map[key]);
        }
        return nmap;
      }, {});
    }
  }]);

  return FixedTw;
}(_Base3.default);

exports.default = FixedTw;
//# sourceMappingURL=FixedTw.js.map