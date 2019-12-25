"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _eachLimit = _interopRequireDefault(require("async/eachLimit"));

var _shouldExclude = _interopRequireDefault(require("./shouldExclude"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function traversalFolder({
  from,
  exclude,
  storer
}) {
  const root = (0, _fs.readdirSync)(from, {
    withFileTypes: true
  });
  await (0, _eachLimit.default)(root, 8, async content => {
    if (content.isDirectory()) {
      if ((0, _shouldExclude.default)(content.name, exclude.dir)) {
        return;
      }

      storer.dirs.add(_path.default.join(from, content.name));
      await traversalFolder({
        from: _path.default.join(from, content.name),
        exclude,
        storer
      });
      return;
    }

    if ((0, _shouldExclude.default)(content.name, exclude.file)) {
      return;
    }

    storer.files.add(_path.default.join(from, content.name));
    return;
  });
}

var _default = traversalFolder;
exports.default = _default;
module.exports = exports.default;