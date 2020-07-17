import traversalFolder from './traversalFolder';

import dispatch, { pinboardHole } from './pinboard';

async function main({ from = '.', exclude = {} }) {
  dispatch({ component: 'newStorer' });

  dispatch({
    component: 'getExclusions',
    input: exclude
  });

  await traversalFolder({
    from,
    exclude: pinboardHole.exclude,
    storer: pinboardHole.storer
  });

  return {
    files: pinboardHole.storer.files.getAll(),
    dirs: pinboardHole.storer.dirs.getAll()
  };
}

export default main;
