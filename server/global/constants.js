/**
 * 全局常量文件
 *
 * @author : Sunkey
 */

var path = require('path');

var rootPath = path.dirname(__dirname); 
// 服务端根路径
exports.ROOT_PATH = rootPath;

// 配置文件路径
exports.CONFIG_PATH = rootPath + '/config';

// 控制器路径
exports.CONTROLLER_PATH = rootPath + '/app/Http/Controllers';

// 模型路径
exports.MODEL_PATH = rootPath + '/app/Models';

// 助手路径
exports.HELPER_PATH = rootPath + '/app/Helpers';
