"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _arrify = _interopRequireDefault(require("arrify"));

var _merge = _interopRequireDefault(require("./utilities/merge"));

var _shouldExclude = _interopRequireDefault(require("./shouldExclude"));

var _Storer = _interopRequireDefault(require("./Storer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main({
  from = '.',
  exclude = {}
}) {
  const storer = new _Storer.default();
  traversalFolder({
    from,
    exclude: getExclusions(exclude),
    storer
  });
  return {
    files: storer.files.getAll(),
    dirs: storer.dirs.getAll()
  };
}

function getExclusions(iptExclude) {
  const _default = {
    dir: [],
    file: []
  };
  const nativeExclusions = (0, _merge.default)(_default, iptExclude);
  return {
    dir: getDirExclusionRegExps((0, _arrify.default)(nativeExclusions.dir)),
    file: getFileExclusionRegExps((0, _arrify.default)(nativeExclusions.file))
  };
}

function traversalFolder({
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
      traversalFolder({
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

function getDirExclusionRegExps(dirExclusions) {
  return dirExclusions.map(pat => {
    return new RegExp(pat);
  });
}

function getFileExclusionRegExps(fileExclusions) {
  return fileExclusions.map(pat => {
    return new RegExp(pat);
  });
}

var _default2 = main;
exports.default = _default2;
module.exports = exports.default;