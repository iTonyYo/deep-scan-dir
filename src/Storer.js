import Collection from './Collection';

class Storer {
  constructor () {
    return {
      files: new Collection(),
      dirs: new Collection(),
    };
  }
}

export default Storer;
