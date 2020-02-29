'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _usecases = require('./usecases');

var _usecases2 = _interopRequireDefault(_usecases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  if (process.argv.length <= 2) {
    var cmd = _path2.default.basename(process.argv[1]);
    console.log('usage: ' + cmd + ' [[CommandNames...] file]');
    _usecases2.default.description();
  } else {
    if (process.argv.length === 3) {
      _usecases2.default.edit(process.argv[2]);
    } else {
      var names = process.argv.slice(2, process.argv.length - 1);
      var editor = (0, _usecases.customFactory)(names);
      editor.edit(process.argv[process.argv.length - 1]);
    }
  }
} catch (e) {
  console.log(e);
  process.exit(1);
}
//# sourceMappingURL=index.js.map