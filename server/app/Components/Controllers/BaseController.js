/**
 * 基础控制器组件
 *
 * @author : Sunkey
 */
function BaseController() {
    this.request = null;
    this.response = null;
    this.next = null;

    this.init = function(req, res, next) {
        this.request = req;
        this.response = res;
        this.next = next;

        // 跨域资源共享
        var corsConfig = require(GLB.CONS.CONFIG_PATH + '/cors');
        this.response.set('Access-Control-Allow-Origin', corsConfig.allow.join(','));       
    }
}

module.exports = BaseController;
