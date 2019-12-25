import { readdirSync } from 'fs';
import path from 'path';
import shouldExclude from './shouldExclude';

function traversalFolderSync({from, exclude, storer}) {
  const root = readdirSync(from, {
    withFileTypes: true,
  });

  root.forEach((content) => {
    if (content.isDirectory()) {
      if (shouldExclude(content.name, exclude.dir)) {
        return;
      }

      storer.dirs.add(path.join(from, content.name));
      traversalFolderSync({
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

export default traversalFolderSync;
