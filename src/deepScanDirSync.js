import dispatch, { pcbHole } from './pcb';

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
      exclude: pcbHole.exclude,
      storer: pcbHole.storer
    }
  });

  return {
    files: pcbHole.storer.files.getAll(),
    dirs: pcbHole.storer.dirs.getAll()
  };
};
