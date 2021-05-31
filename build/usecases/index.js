'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customFactory = exports.Edit = exports.editors = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Category2Keyword = require('./Category2Keyword');

var _Category2Keyword2 = _interopRequireDefault(_Category2Keyword);

var _CountNotZero = require('./CountNotZero');

var _CountNotZero2 = _interopRequireDefault(_CountNotZero);

var _CountZero = require('./CountZero');

var _CountZero2 = _interopRequireDefault(_CountZero);

var _CountMinus = require('./CountMinus');

var _CountMinus2 = _interopRequireDefault(_CountMinus);

var _DeleteFoodDrivePlace = require('./DeleteFoodDrivePlace');

var _DeleteFoodDrivePlace2 = _interopRequireDefault(_DeleteFoodDrivePlace);

var _CsvEdit = require('./CsvEdit');

var _CsvEdit2 = _interopRequireDefault(_CsvEdit);

var _DeleteItems = require('./DeleteItems');

var _EditAll = require('./EditAll');

var _EditAll2 = _interopRequireDefault(_EditAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editors = exports.editors = {
  Category2Keyword: _Category2Keyword2.default,
  CountNotZero: _CountNotZero2.default,
  CountZero: _CountZero2.default,
  CountMinus: _CountMinus2.default,
  DeleteFoodDrivePlace: _DeleteFoodDrivePlace2.default,
  CsvEdit: _CsvEdit2.default,
  DeleteNullItems: _DeleteItems.DeleteNullItems,
  DeleteNullItemsNotUpdated: _DeleteItems.DeleteNullItemsNotUpdated
};

var Edit = exports.Edit = _EditAll2.default;

exports.default = new _EditAll2.default(Object.values(editors).map(function (e) {
  return new e();
}));
var customFactory = exports.customFactory = function customFactory(names) {
  return new _EditAll2.default(Object.entries(editors).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        k = _ref2[0];

    return names.includes(k);
  }).map(function (arr) {
    console.log('# use ' + arr[0] + ' #');return arr;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        e = _ref4[1];

    return new e();
  }));
};
//# sourceMappingURL=index.js.map