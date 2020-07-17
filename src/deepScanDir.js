import traversalFolder from './traversalFolder';

import dispatch, { pcbHole } from './pcb';

async function main({ from = '.', exclude = {} }) {
  dispatch({ component: 'newStorer' });

  dispatch({
    component: 'getExclusions',
    input: exclude
  });

  await traversalFolder({
    from,
    exclude: pcbHole.exclude,
    storer: pcbHole.storer
  });

  return {
    files: pcbHole.storer.files.getAll(),
    dirs: pcbHole.storer.dirs.getAll()
  };
}

export default main;
