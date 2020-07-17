import Storer from './Storer';
import { setHole } from './pcb';

export default () => {
  setHole('storer', new Storer());
};
