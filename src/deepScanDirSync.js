import Storer from './Storer';
import traversalFolderSync from './traversalFolderSync';
import getExclusions from './getExclusions';

function main({from = '.', exclude = {}}) {
  const storer = new Storer();

  traversalFolderSync({
    from,
    exclude: getExclusions(exclude),
    storer,
  });

  return {
    files: storer.files.getAll(),
    dirs: storer.dirs.getAll(),
  };
}

export default main;
