/**
 * 全局函数文件
 *
 * @author : Sunkey
 */

exports.env = function(key, val) {
    var envConfig = require('../.env');
    
    return envConfig[key] || val;
};
