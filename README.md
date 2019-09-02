[![Maintainability](https://api.codeclimate.com/v1/badges/541030ad0c70589a76f3/maintainability)](https://codeclimate.com/github/iTonyYo/deep-scan-dir/maintainability)

# deepScanDir({from, exclude})

- `from` {String} 目标文件或文件夹，**默认：** `.`
- `exclude` {Object}
  - `dir` {String | Array} 文件夹忽略规则
  - `file` {String | Array} 文件忽略规则
- 返回: {Promise} 扫描到的文件夹、文件

专注于深度扫描给定文件夹，额外仅支持了忽略行为。

## 目录

- [目录](#目录)
- [安装](#安装)
- [使用](#使用)
- [贡献指南](#贡献指南)
- [证书](#证书)

## 安装

```shell
# 使用 NPM
$ npm i deep-scan-dir

# 使用 Yarn
$ yarn add deep-scan-dir
```

## 使用

```javascript
import { realpathSync } from 'fs';
import deepScanDir from 'deep-scan-dir';

(async () => {
  const {dirs, files} = await deepScanDir({
    from: realpathSync(process.cwd()),
    exclude: {
      dir: [
        'node_modules',
        '.git',
      ],
    },
  });
})();
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`deep-scan-dir`][deep-scan-dir] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。



[贡献指南]: https://github.com/iTonyYo/deep-scan-dir/blob/master/CONTRIBUTING.md

[证书]: https://github.com/iTonyYo/deep-scan-dir/blob/master/LICENSE.md

[deep-scan-dir]: https://git.io/fjp3u
