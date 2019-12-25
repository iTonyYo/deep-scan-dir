"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _arrify = _interopRequireDefault(require("arrify"));

var _merge = _interopRequireDefault(require("./utilities/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _default2 = getExclusions;
exports.default = _default2;
module.exports = exports.default;