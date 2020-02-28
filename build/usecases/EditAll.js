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

var EditAll = function () {
  function EditAll(editors) {
    _classCallCheck(this, EditAll);

    this.editors = editors;
    if (!editors.length) {
      throw new Error('コマンドが指定されていません');
    }
  }

  _createClass(EditAll, [{
    key: 'description',
    value: function description() {
      console.log(this.editors.map(function (e) {
        return e.description();
      }).join('\n'));
    }
  }, {
    key: 'edit',
    value: function edit(targetPath) {
      var _this = this;

      this._preEditAll().then(function () {
        _this._editTarget(targetPath);
      }).catch(function (e) {
        console.log('前処理で失敗しました', JSON.stringify(e, null, 2));
      });
    }
  }, {
    key: '_editTarget',
    value: function _editTarget(targetPath) {
      var arr = this._path2Json(targetPath);
      if (!Array.isArray(arr)) throw new Error('\u30D5\u30A1\u30A4\u30EB ' + targetPath + ' \u304C\u914D\u5217\u5F62\u5F0F\u306B\u306A\u3063\u3066\u3044\u307E\u305B\u3093\u3002');
      var res = this._editAll(arr);
      if (res && res.length) {
        var dir = _path2.default.dirname(targetPath);
        var base = _path2.default.basename(targetPath);
        var npath = _path2.default.join(dir, 'edited_' + base);
        this._json2Path(npath, res);
        if (process.env.FDKCACHEEDIT_OUTPUTORG) {
          var orgPath = _path2.default.join(dir, 'org_' + base);
          var idSet = new Set(res.map(function (info) {
            return String(info.id);
          }));
          this._json2Path(orgPath, arr.filter(function (info) {
            return idSet.has(String(info.id));
          }));
        }
      } else {
        console.log('編集したデータはありませんでした');
      }
    }
  }, {
    key: '_preEditAll',
    value: function _preEditAll() {
      return Promise.all(this.editors.map(function (e) {
        return e.preEdit();
      }));
    }
  }, {
    key: '_editAll',
    value: function _editAll(zaicos) {
      var _this2 = this;

      return zaicos.map(function (zaico, idx) {
        var editors = _this2.editors.filter(function (e) {
          return e.isTarget(zaico);
        });
        if (editors.length) {
          console.log('[' + (idx + 1) + '/' + zaicos.length + '] ' + zaico.title);
          var nZaico = editors.reduce(function (z, e) {
            return e.editOne(z);
          }, _this2._cloneDeepJsonObj(zaico));
          if (!_this2._equalsDeep(zaico, nZaico)) return nZaico;
        }
        return undefined;
      }).filter(function (v) {
        return v;
      });
    }
  }, {
    key: '_cloneDeepJsonObj',
    value: function _cloneDeepJsonObj(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }, {
    key: '_equalsDeep',
    value: function _equalsDeep(o1, o2) {
      return JSON.stringify(o1) === JSON.stringify(o2);
    }
  }, {
    key: '_json2path',
    value: function _json2path(targetPath, json) {
      _fs2.default.writeFileSync(targetPath, JSON.stringify(json, null, 2));
    }
  }, {
    key: '_path2Json',
    value: function _path2Json(targetPath) {
      if (!_fs2.default.existsSync(targetPath)) {
        throw new Error('\u30D5\u30A1\u30A4\u30EB ' + targetPath + ' \u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u30D1\u30B9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002');
      }
      try {
        console.log('read... ' + targetPath);
        return JSON.parse(_fs2.default.readFileSync(targetPath, 'utf-8'));
      } catch (e) {
        throw new Error('\u30D5\u30A1\u30A4\u30EB ' + targetPath + ' \u306E JSON \u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F ' + e);
      }
    }
  }, {
    key: '_json2Path',
    value: function _json2Path(targetPath, json) {
      try {
        console.log('write... ' + targetPath);
        return _fs2.default.writeFileSync(targetPath, JSON.stringify(json, null, 2));
      } catch (e) {
        throw new Error('\u30D5\u30A1\u30A4\u30EB ' + targetPath + ' \u306E JSON \u66F8\u304D\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F ' + e);
      }
    }
  }]);

  return EditAll;
}();

exports.default = EditAll;
//# sourceMappingURL=EditAll.js.map