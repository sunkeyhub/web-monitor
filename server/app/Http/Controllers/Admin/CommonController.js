/**
 * 通用数据接口控制器
 *
 * @author : Sunkey
 */

var BaseController = require(GLB.CONS.COMPONENT_PATH + '/Controllers/BaseController');
var report = require(GLB.CONS.ROOT_PATH + '/app/Data/Report');
var factors = require(GLB.CONS.ROOT_PATH + '/app/Data/Factors');

function CommonController() {
    BaseController.call(this);
    var pri = {};
    var pub = this;

    /**
     * 获取页面列表接口
     * @return Json
     */
    pub.pageList = function pageList() {
        var pageList = report.page;

        pub.response.json({code: 200, data: pageList});
    }

    /**
     * 获取分析因子列表
     * @return Json
     */
    pub.factorList = function factorList() {
        var type = pub.request.query.type;
        var list = factors[type];

        pub.response.json({code: 200, data: list});
    }
}

module.exports = new CommonController();
