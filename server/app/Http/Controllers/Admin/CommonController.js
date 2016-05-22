/**
 * 通用数据接口控制器
 *
 * @author : Sunkey
 */

var _ = require('lodash');
var BaseController = require(GLB.CONS.COMPONENT_PATH + '/Controllers/BaseController');
var reportIdMap = require(GLB.CONS.ROOT_PATH + '/app/Data/ReportIdMap');
var moment = require('moment');

function CommonController() {
    BaseController.call(this);
    var pri = {};
    var pub = this;

    /**
     * 获取页面列表接口
     * @return json
     */
    pub.pageList = function() {
        var pageMap = reportIdMap.page;
        var pageList = [];
        _.forOwn(pageMap, function(val, key) {
            val['page_id'] = key;
            pageList.push(val);
        });

        pub.response.json({code: 200, data: pageList});
    }
}

module.exports = new CommonController();
