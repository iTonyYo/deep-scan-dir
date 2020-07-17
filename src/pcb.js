// TODO: 思考，"触发器、接口等组成的钉板" 概念
// TODO: 思考，从钉板上专门的地方获取数据
// TODO: 思考，将数据输出到钉板上专门位置

import functionRegistry from './functionRegistry';

export const pcbHole = {};

export const setHole = (key, value) => {
  pcbHole[key] = value;
};

const dispatch = ({ component, input }) => functionRegistry[component](input);

export default dispatch;
