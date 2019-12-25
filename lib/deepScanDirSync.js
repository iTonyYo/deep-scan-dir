"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Storer = _interopRequireDefault(require("./Storer"));

var _traversalFolderSync = _interopRequireDefault(require("./traversalFolderSync"));

var _getExclusions = _interopRequireDefault(require("./getExclusions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main({
  from = '.',
  exclude = {}
}) {
  const storer = new _Storer.default();
  (0, _traversalFolderSync.default)({
    from,
    exclude: (0, _getExclusions.default)(exclude),
    storer
  });
  return {
    files: storer.files.getAll(),
    dirs: storer.dirs.getAll()
  };
}

var _default = main;
exports.default = _default;
module.exports = exports.default;