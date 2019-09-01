"use strict";

var _fs = require("fs");

var _util = require("util");

var _path = _interopRequireDefault(require("path"));

var _eachLimit = _interopRequireDefault(require("async/eachLimit"));

var _merge = _interopRequireDefault(require("./utilities/merge"));

var _shouldExclude = _interopRequireDefault(require("./shouldExclude"));

var _Collection = _interopRequireDefault(require("./Collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pReadir = (0, _util.promisify)(_fs.readdir);
const dirs = new _Collection.default();
const files = new _Collection.default();

async function main({
  from,
  exclude
}) {
  await traversalFolder({
    from,
    exclude: getExclusions(exclude)
  });
  return {
    files: files.getAll(),
    dirs: dirs.getAll()
  };
}

function getExclusions(iptExclude) {
  const _default = {
    dir: [],
    file: []
  };
  const nativeExclusions = (0, _merge.default)(_default, iptExclude);
  return {
    dir: getDirExclusionRegExps(nativeExclusions.dir),
    file: getFileExclusionRegExps(nativeExclusions.file)
  };
}

async function traversalFolder({
  from,
  exclude
}) {
  const root = await pReadir(from, {
    withFileTypes: true
  });
  await (0, _eachLimit.default)(root, 8, async content => {
    if (content.isDirectory()) {
      if ((0, _shouldExclude.default)(content.name, exclude.dir)) {
        return;
      }

      dirs.add(_path.default.join(from, content.name));
      await traversalFolder({
        from: _path.default.join(from, content.name),
        exclude
      });
      return;
    }

    if ((0, _shouldExclude.default)(content.name, exclude.file)) {
      return;
    }

    files.add(_path.default.join(from, content.name));
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

module.exports = main;