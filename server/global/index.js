/**
 * 全局变量入口文件
 *
 * @author : Sunkey
 */

// 超全局变量
require('./super.js');

var commonGlb = require('../../common/global/index');
var functions = require('./functions');
var constants = require('./constants');

var glb = {
    FUNC: functions,
    CONS: constants,
};

_.merge(glb, commonGlb);

module.exports = glb;
