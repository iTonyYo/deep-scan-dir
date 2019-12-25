import trash from 'trash';
import { resolveCwd } from './paths';

(async () => {
  await trash([
    resolveCwd('esm'),
    resolveCwd('lib'),
    resolveCwd('build'),
    resolveCwd('dest'),
  ]);
})();
