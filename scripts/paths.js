import { realpathSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveCwd   = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  resolveCwd,
  docsPath: resolveCwd('docs'),
  srcIndexPath: resolveCwd('src/index.js'),
};
