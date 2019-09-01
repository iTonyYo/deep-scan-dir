import { readdirSync } from 'fs';
import path from 'path';

import eachLimit from 'async/eachLimit';

import merge from './utilities/merge';
import shouldExclude from './shouldExclude';
import Storer from './Storer';

async function main({from = '.', exclude = {}}) {
  const storer = new Storer();

  await traversalFolder({
    from,
    exclude: getExclusions(exclude),
    storer,
  });

  return {
    files: storer.files.getAll(),
    dirs: storer.dirs.getAll(),
  };
}

function getExclusions(iptExclude) {
  const _default = {dir: [], file: []};
  const nativeExclusions = merge(_default, iptExclude);

  return {
    dir: getDirExclusionRegExps(nativeExclusions.dir),
    file: getFileExclusionRegExps(nativeExclusions.file)
  };
}

async function traversalFolder({from, exclude, storer}) {
  const root = readdirSync(from, {
    withFileTypes: true,
  });

  await eachLimit(root, 8, async (content) => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, exclude.dir)) {
        return;
      }

      storer.dirs.add(path.join(from, content.name));
      await traversalFolder({
        from: path.join(from, content.name),
        exclude,
        storer,
      });

      return;
    }

    if (shouldExclude(content.name, exclude.file)) {
      return;
    }

    storer.files.add(path.join(from, content.name));
    return;
  });
}

function getDirExclusionRegExps(dirExclusions) {
  return dirExclusions.map((pat) => {
    return new RegExp(pat);
  });
}

function getFileExclusionRegExps(fileExclusions) {
  return fileExclusions.map((pat) => {
    return new RegExp(pat);
  });
}

module.exports = main;