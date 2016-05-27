/**
 * 全局变量入口文件
 *
 * @author : Sunkey
 */

// 超全局变量
require('./super.js');

var functions = require('./functions');
var constants = require('./constants');

module.exports = {
    FUNC: functions,
    CONS: constants,
};

