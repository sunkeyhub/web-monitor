/**
 * 全局函数文件
 *
 * @author : Sunkey
 */

/**
 * 读取环境变量
 * @param  String key 环境变量
 * @param  Mixed val 默认值
 * @return Mixed
 */
exports.env = function(key, val) {
    var envConfig = require('../.env');
    
    return envConfig[key] || val;
};
