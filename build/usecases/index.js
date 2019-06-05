'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.editors = undefined;

var _Category2Keyword = require('./Category2Keyword');

var _Category2Keyword2 = _interopRequireDefault(_Category2Keyword);

var _CountNotZero = require('./CountNotZero');

var _CountNotZero2 = _interopRequireDefault(_CountNotZero);

var _CountZero = require('./CountZero');

var _CountZero2 = _interopRequireDefault(_CountZero);

var _CountMinus = require('./CountMinus');

var _CountMinus2 = _interopRequireDefault(_CountMinus);

var _EditAll = require('./EditAll');

var _EditAll2 = _interopRequireDefault(_EditAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editors = exports.editors = {
  Category2Keyword: _Category2Keyword2.default,
  CountNotZero: _CountNotZero2.default,
  CountZero: _CountZero2.default,
  CountMinus: _CountMinus2.default
};

var Edit = exports.Edit = _EditAll2.default;

exports.default = new _EditAll2.default(Object.values(editors).map(function (e) {
  return new e();
}));
//# sourceMappingURL=index.js.map