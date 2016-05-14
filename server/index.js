/**
 * APP项目入口文件
 *
 * @author : Sunkey
 */

// 载入全局变量
GLB = require('./global/index');

GLB.app = require('./boot/app');

GLB.app.run();