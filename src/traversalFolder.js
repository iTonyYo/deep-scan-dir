import { readdirSync } from 'fs';
import path from 'path';

import eachLimit from 'async/eachLimit';

import shouldExclude from './shouldExclude';

async function traversalFolder({from, exclude, storer}) {
  const root = readdirSync(from, {
    withFileTypes: true,
  });

  await eachLimit(root, 8, async (content) => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, exclude.dir)) {
        return;
      }

      storer.dirs.add(path.join(from, content.name));
      await traversalFolder({
        from: path.join(from, content.name),
        exclude,
        storer,
      });

      return;
    }

    if (shouldExclude(content.name, exclude.file)) {
      return;
    }

    storer.files.add(path.join(from, content.name));
    return;
  });
}

export default traversalFolder;
