"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _shouldExclude = _interopRequireDefault(require("./shouldExclude"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function traversalFolderSync({
  from,
  exclude,
  storer
}) {
  const root = (0, _fs.readdirSync)(from, {
    withFileTypes: true
  });
  root.forEach(content => {
    if (content.isDirectory()) {
      if ((0, _shouldExclude.default)(content.name, exclude.dir)) {
        return;
      }

      storer.dirs.add(_path.default.join(from, content.name));
      traversalFolderSync({
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

var _default = traversalFolderSync;
exports.default = _default;
module.exports = exports.default;