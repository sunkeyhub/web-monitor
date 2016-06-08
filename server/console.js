/**
 * CLI项目入口文件
 *
 * @author : Sunkey
 */

// 载入全局变量
GLB = require('./global/index');

GLB.app = require('./core/console');

GLB.app.run();