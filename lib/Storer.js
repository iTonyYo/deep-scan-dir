"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Collection = _interopRequireDefault(require("./Collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Storer {
  constructor() {
    return {
      files: new _Collection.default(),
      dirs: new _Collection.default()
    };
  }

}

var _default = Storer;
exports.default = _default;
module.exports = exports.default;