import arrify from 'arrify';
import merge from './utilities/merge';
import { setHole } from './pcb';

function getExclusions(iptExclude) {
  const _default = { dir: [], file: [] };
  const nativeExclusions = merge(_default, iptExclude);

  setHole('exclude', {
    dir: getDirExclusionRegExps(arrify(nativeExclusions.dir)),
    file: getFileExclusionRegExps(arrify(nativeExclusions.file))
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

export default getExclusions;
