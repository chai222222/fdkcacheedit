'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteNullItemsNotUpdated = exports.DeleteNullItems = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteItems = function (_Base) {
  _inherits(DeleteItems, _Base);

  function DeleteItems() {
    _classCallCheck(this, DeleteItems);

    return _possibleConstructorReturn(this, (DeleteItems.__proto__ || Object.getPrototypeOf(DeleteItems)).apply(this, arguments));
  }

  _createClass(DeleteItems, [{
    key: '_checkDefine',
    value: function _checkDefine() {
      // 派生クラスで必ず定義すること
      console.error('must be define derived class');
      process.exit(1);
    }
  }, {
    key: 'getDescriptions',
    value: function getDescriptions() {
      this._checkDefine();
    }
  }, {
    key: 'description',
    value: function description() {
      var descs = this.getDescriptions();
      return '\u3010DeleteNullItems\u3011\n\u5168\u6761\u4EF6\u306B\u30DE\u30C3\u30C1\u3057\u305F\u30C7\u30FC\u30BF\u306E\u524A\u9664\n' + descs.join('\n') + '\n';
    }
  }, {
    key: 'isTarget',
    value: function isTarget(zaico) {
      return this.isDeleteTarget(zaico);
    }
  }, {
    key: 'isDeleteTarget',
    value: function isDeleteTarget(zaico) {
      this._checkDefine();
    }
  }, {
    key: 'editOne',
    value: function editOne(zaico) {
      if (!record) return zaico; // zaicoのデータがinputのcsvには存在しない
      return this.isDeleteTarget(zaico) ? { id: zaico.id } : zaico;
    }
  }]);

  return DeleteItems;
}(_Base3.default);

var DeleteNullItems = exports.DeleteNullItems = function (_DeleteItems) {
  _inherits(DeleteNullItems, _DeleteItems);

  function DeleteNullItems() {
    _classCallCheck(this, DeleteNullItems);

    return _possibleConstructorReturn(this, (DeleteNullItems.__proto__ || Object.getPrototypeOf(DeleteNullItems)).apply(this, arguments));
  }

  _createClass(DeleteNullItems, [{
    key: 'getDescriptions',
    value: function getDescriptions() {
      return ['数量(quantity)がnull', '画像(item_image.url)がnull'];
    }
  }, {
    key: 'isDeleteTarget',
    value: function isDeleteTarget(zaico) {
      return zaico.quantity === null || _lodash2.default.get(zaico, 'item_image.url', null) === null;
    }
  }]);

  return DeleteNullItems;
}(DeleteItems);

var DeleteNullItemsNotUpdated = exports.DeleteNullItemsNotUpdated = function (_DeleteNullItems) {
  _inherits(DeleteNullItemsNotUpdated, _DeleteNullItems);

  function DeleteNullItemsNotUpdated() {
    _classCallCheck(this, DeleteNullItemsNotUpdated);

    return _possibleConstructorReturn(this, (DeleteNullItemsNotUpdated.__proto__ || Object.getPrototypeOf(DeleteNullItemsNotUpdated)).apply(this, arguments));
  }

  _createClass(DeleteNullItemsNotUpdated, [{
    key: 'getDescriptions',
    value: function getDescriptions() {
      return [].concat(_toConsumableArray(_get(DeleteNullItemsNotUpdated.prototype.__proto__ || Object.getPrototypeOf(DeleteNullItemsNotUpdated.prototype), 'getDescriptions', this).call(this)), ['作成日時(created_at)と更新日時(updated_at)の値が等価']);
    }
  }, {
    key: 'isDeleteTarget',
    value: function isDeleteTarget(zaico) {
      return _get(DeleteNullItemsNotUpdated.prototype.__proto__ || Object.getPrototypeOf(DeleteNullItemsNotUpdated.prototype), 'isDeleteTarget', this).call(this, zaico) && zaico.created_at === zaico.updated_at;
    }
  }]);

  return DeleteNullItemsNotUpdated;
}(DeleteNullItems);
//# sourceMappingURL=DeleteItems.js.map