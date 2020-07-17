import Storer from './Storer';
import { setHole } from './pinboard';

export default () => {
  setHole('storer', new Storer());
};
