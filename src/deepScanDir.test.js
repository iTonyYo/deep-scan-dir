import { realpathSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveCwd   = relativePath => resolve(appDirectory, relativePath);

import { assert } from 'chai';
import deepScanDir from './deepScanDir';

setTimeout(() => {
  suite('deepScanDir({from, exclude})', () => {
    test("`exclude` 配置是可选的", async () => {
      const rslt = await deepScanDir({
        from: resolveCwd('src'),
      });

      assert.isFalse(rslt.files.length === 0);
    });

    test('支持只忽略文件', async () => {
      const rslt = await deepScanDir({
        from: resolveCwd('src'),
        exclude: {
          file: ['deep', 'should'],
        },
      });

      assert.isFalse(rslt.files.length === 0);
    });

    test('支持只忽略文件夹', async () => {
      const rslt = await deepScanDir({
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
      const rslt = await deepScanDir({
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
