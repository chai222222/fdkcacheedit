'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _usecases = require('./usecases');

var _usecases2 = _interopRequireDefault(_usecases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.argv.length <= 2) {
  var cmd = _path2.default.basename(process.argv[1]);
  console.log('usage: ' + cmd + ' [file]');
  _usecases2.default.description();
} else {
  _usecases2.default.edit(process.argv[2]);
}
//# sourceMappingURL=index.js.map