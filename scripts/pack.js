import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, realpathSync } from 'fs';

import { minify } from 'terser';
import fg from 'fast-glob';
import execa from 'execa';
import chalk from 'chalk';
import { rollup } from 'rollup';

import pMap from 'p-map';
import pSeries from 'p-series';
import each from 'async/each';

import { resolveCwd, srcIndexPath } from './paths';

async function main() {
  await pSeries([
    () => rollupBuild(),
    () => compress(),
  ]);

  console.log(chalk `{greenBright 构建成功!}`);
}

async function rollupBuild() {
  const bundle = await rollup({
    input: srcIndexPath,
    external: ['fs', 'path', 'arrify', 'async/eachLimit', 'deepmerge'],
  });

  await bundle.write({
    dir: resolveCwd('lib'),
    format: 'cjs',
  });
}

async function compress() {
  await each(await getLibs(), async (src) => {
    const { code } = minify(
      readFileSync(src, {encoding: 'utf-8'}),
      {
        mangle: false,
      },
    );

    writeFileSync(src, code);
    return;
  });
}

async function getLibs() {
  const libs = await fg(['lib/**/*.js']);

  return libs;
}

(async () => {
  try {
    await main();
  } catch (err) {
    throw(err);
  }
})();
