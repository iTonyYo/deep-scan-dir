"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Collection {
  constructor() {
    return {
      list: [],
      add: function (item) {
        this.list.push(item);
      },
      getAll: function () {
        return this.list;
      }
    };
  }

}

var _default = Collection;
exports.default = _default;
module.exports = exports.default;