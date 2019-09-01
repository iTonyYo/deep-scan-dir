"use strict";

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

module.exports = Storer;