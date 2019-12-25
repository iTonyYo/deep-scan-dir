import Storer from './Storer';
import traversalFolder from './traversalFolder';
import getExclusions from './getExclusions';

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

export default main;
