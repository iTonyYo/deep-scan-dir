//! 功能注册表

// TODO: "注册表" 应该通过打包工具自动生成。
// TODO: 可指定哪些模块需注册到 "注册表"。

import getExclusions from './getExclusions';
import traversalFolderSync from './traversalFolderSync';
import newStorer from './newStorer';

export default { getExclusions, traversalFolderSync, newStorer };
