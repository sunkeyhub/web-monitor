/**
 * 基础控制器
 *
 * @author : Sunkey
 */
function Controller() {
}

Controller.prototype.request = null;
Controller.prototype.response = null;
/**
 * 初始化接口
 * @param  Object   req  请求对象
 * @param  Object   res  响应对象
 * @param  Function next next函数
 * @return null
 */
Controller.prototype.init = function(req, res, next) {
    this.request = req;
    this.response = res;
    this.next = next;

    var corsConfig = require(GLB.CONS.CONFIG_PATH + '/cors');
    this.response.set('Access-Control-Allow-Origin', corsConfig.allow.join(','));
};

module.exports = Controller;