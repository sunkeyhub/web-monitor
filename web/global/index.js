/**
 * 前端全局入口
 *
 * @author : Sunkey
 */

require('./super');

var commonGlb = require('../../common/global/index');

var glb = {
	FUNC: {},
	CONS: {},
};

_.merge(glb, commonGlb);

module.exports = glb;