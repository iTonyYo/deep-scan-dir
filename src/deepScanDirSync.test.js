import { realpathSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveCwd   = relativePath => resolve(appDirectory, relativePath);

import { assert } from 'chai';
import deepScanDirSync from './deepScanDirSync';

setTimeout(() => {
  suite('deepScanDirSync({from, exclude})', () => {

    test("`exclude` 配置是可选的", () => {
      const rslt = deepScanDirSync({
        from: resolveCwd('src'),
      });

      assert.isFalse(rslt.files.length === 0);
    });

    test('支持只忽略文件', () => {
      const rslt = deepScanDirSync({
        from: resolveCwd('src'),
        exclude: {
          file: ['deep', 'should'],
        },
      });

      assert.isFalse(rslt.files.length === 0);
    });

    test('支持只忽略文件夹', () => {
      const rslt = deepScanDirSync({
        from: appDirectory,
        exclude: {
          dir: [
            'node_modules',
            '.git',
            'docs',
            '.vscode',
            'esm',
            '.nyc_output',
          ],
        },
      });

      assert.isFalse(rslt.dirs.length === 0);
    });

    test('支持单个忽略规则', async () => {
      const rslt = deepScanDirSync({
        from: appDirectory,
        exclude: {
          dir: 'node_modules',
        },
      });

      assert.isFalse(rslt.dirs.length === 0);
    });

  });

  run();
}, 0);
