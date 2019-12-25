import { resolve, join, dirname } from 'path';
import { readFileSync, writeFileSync, realpathSync } from 'fs';

import Terser from 'terser';
import fg from 'fast-glob';
import execa from 'execa';
import chalk from 'chalk';

import pMap from 'p-map';
import pSeries from 'p-series';
import each from 'async/each';

import { resolveCwd } from './paths';

async function main() {
  await pSeries([
    () => taskBuild(),
    () => taskCompress(),
  ]);

  console.log(chalk `{greenBright 构建成功!}`);
}

async function taskBuild() {
  await pMap(await getSrcs(), async (src) => {
    await build(src);
    return;
  }, { concurrency: 8 });
}

async function taskCompress() {
  await each(await getLibs(), async (src) => {
    const { code } = Terser.minify(
      readFileSync(src, {encoding: 'utf-8'}),
      {
        mangle: false,
      },
    );

    writeFileSync(src, code);
    return;
  });
}

async function build(src) {
  await execa(
    'npx',
    [
      'babel',
      '-d',
      getDestPath(src),
      resolveCwd(src),
    ]
  );
}

function getDestPath(path) {
  return dirname(
    join(
      resolveCwd('lib'),
      path.substring('src/'.length, path.length),
    )
  );
}

async function getSrcs() {
  const srcs = await fg([
    'src/**/*.js',
    '!src/**/(*.)+(benchmark|test).js',
  ]);

  return srcs;
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
