"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepScanDir = _interopRequireDefault(require("./deepScanDir"));

var _deepScanDirSync = _interopRequireDefault(require("./deepScanDirSync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  deepScanDir: _deepScanDir.default,
  deepScanDirSync: _deepScanDirSync.default
};
exports.default = _default;
module.exports = exports.default;