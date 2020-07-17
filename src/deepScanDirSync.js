import dispatch, { pinboardHole } from './pinboard';

export default ({ from = '.', exclude = {} }) => {
  dispatch({ component: 'newStorer' });

  dispatch({
    component: 'getExclusions',
    input: exclude
  });

  dispatch({
    component: 'traversalFolderSync',
    input: {
      from,
      exclude: pinboardHole.exclude,
      storer: pinboardHole.storer
    }
  });

  return {
    files: pinboardHole.storer.files.getAll(),
    dirs: pinboardHole.storer.dirs.getAll()
  };
};
