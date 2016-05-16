/**
 * 数据上报控制器
 *
 * @author : Sunkey
 */

var co = require('co');
var _ = require('lodash');
var useragent = require('useragent');

function ReportController() {
    var pub = this;
    var pri = {};

    // ms
    pri.timingLimit = 100000;

    // 构造器借用
    pri.BaseController = require(GLB.CONS.COMPONENT_PATH + '/Controllers/BaseController');
    pri.BaseController.call(this);

    pri.reportIdMap = require(GLB.CONS.ROOT_PATH + '/app/Data/ReportIdMap');
    pri.reportJsMetaModel = require(GLB.CONS.MODEL_PATH + '/ReportJsMetaModel');
    pri.reportJsErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportJsErrorModel');
    pri.reportApiErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportApiErrorModel');

    pri.serviceOption = null;
    pri.serviceData = null;

    pub.before = function before() {
        var query = pub.request.query.q;
        if (!query) {
            GLB.app.logger.error('缺少上报参数q | ' + self.request.url);
            return pub.response.jsonp({code: 400, msg: '缺少上报参数q'});
        } else {
            try {
                var queryJson = JSON.parse(query);
            } catch(e) {
                GLB.app.logger.error('上报参数非法 | JSON.parse | ' + e.message);
                return pub.response.jsonp({code: 400, msg: '上报参数非法 | ' + e.message});
            }

            if (queryJson.option && queryJson.data) {
                pri.serviceOption = queryJson.option;
                pri.serviceData = queryJson.data;

                if (!pri.reportIdMap.page[pri.serviceData.page_id]) {
                    return pub.response.jsonp({code: 400, msg: 'page_id 不存在'});
                }

            } else {
                GLB.app.logger.error('上报参数不全 | 缺少option/data | ' + query);
                return pub.response.jsonp({code: 400, msg: '上报参数不全 | 缺少option/data'});
            }
        }
    };

    /**
     * 数据上报接口
     * @return Json
     */
    pub.index = function index() {
        switch (pri.serviceOption.service_id) {
            case 1001:          // 元数据上报服务
                return pri.jsMetaService();
            case 1002:          // 元数据上报服务
                return pri.jsErrorService();
            case 1003:          // js错误上报服务
                return pri.apiErrorService();
            default:
                return this.response.status(404).end('服务不存在');
        }
    };

    /**
     * 元数据上报服务
     * @param Object 
     * @return Json
     */
    pri.jsMetaService = function jsMetaService() {
        // 校验时间数据的有效性
        if (!pri.checkTimingValid(pri.serviceData)) {
            return pub.response.jsonp({code: 400, msg: 'timing数据无效'});
        }

        // 处理数据
        pri.processCommonData(pri.processJsMetaData)();

        return co(function *() {
            try {
                yield pri.reportJsMetaModel.create(pri.serviceData);
                return pub.response.jsonp({code: 200});
            } catch(e) {
                GLB.app.logger.error(e.message + ' | ' + JSON.stringify(e.errors));
                return pub.response.jsonp({code: 400, msg: e.message + ' | ' + JSON.stringify(e.errors)});
            }
        });
    };

    /**
     * js报错上报服务
     * @return Json
     */
    pri.jsErrorService = function jsErrorService() {
        // 处理数据
        pri.processCommonData(pri.processJsErrorData)();

        return co(function *() {
            try {
                yield pri.reportJsErrorModel.create(pri.serviceData);
                return pub.response.jsonp({code: 200});
            } catch(e) {
                GLB.app.logger.error(e.message + ' | ' + JSON.stringify(e.errors));
                return pub.response.jsonp({code: 400, msg: e.message + ' | ' + JSON.stringify(e.errors)});
            }
        });
    };

    /**
     * api报错上报服务
     * @return Json
     */
    pri.apiErrorService = function apiErrorService() {
        // 处理数据
        pri.processCommonData(pri.processApiErrorData)();

        return co(function *() {
            try {
                yield pri.reportApiErrorModel.create(pri.serviceData);
                return pub.response.jsonp({code: 200});
            } catch(e) {
                GLB.app.logger.error(e.message + ' | ' + JSON.stringify(e.errors));
                return pub.response.jsonp({code: 400, msg: e.message + ' | ' + JSON.stringify(e.errors)});
            }
        });
    };

    // 检测时间有效性
    pri.checkTimingValid = function checkTimingValid() {
        if (!pri.serviceData.performance
        || !pri.serviceData.performance.timing
        || !pri.serviceData.timing_human) {
            return false;
        }

        var performance = pri.serviceData.performance;
        var timingHuman = pri.serviceData.timing_human;

        var cache = performance.timing.domainLookupStart - performance.timing.fetchStart || 0;
        var dns = performance.timing.domainLookupEnd - performance.timing.domainLookupStart || 0;
        var tcp = performance.timing.connectEnd - performance.timing.connectStart || 0;
        var request = performance.timing.responseStart - performance.timing.requestStart || 0;
        var response = performance.timing.responseEnd - performance.timing.responseStart || 0;
        var domParse = performance.timing.domInteractive - performance.timing.domLoading || 0;
        var script = performance.timing.domContentLoadedEventStart - performance.timing.domInteractive || 0;
        var domReady = performance.timing.responseEnd - performance.timing.responseStart || 0;
        var resource = performance.timing.domComplete - performance.timing.domContentLoadedEventEnd || 0;
        var onload = performance.timing.loadEventEnd - performance.timing.loadEventStart || 0;
        var total = performance.timing.loadEventEnd - performance.timing.fetchStart || 0;

        var whiteScreen = +timingHuman.white_screen || 0;
        var firstScreen = +timingHuman.first_screen || 0;
        var domReady = +timingHuman.dom_ready || 0;
        var windowOnload = +timingHuman.window_onload || 0;
        var humanTotal = +timingHuman.total || 0;

        if (cache < 0 || cache > pri.timingLimit
        || dns < 0 || dns > pri.timingLimit
        || tcp < 0 || tcp > pri.timingLimit
        || request < 0 || request > pri.timingLimit
        || response < 0 || response > pri.timingLimit
        || domParse < 0 || domParse > pri.timingLimit
        || script < 0 || script > pri.timingLimit
        || domReady < 0 || domReady > pri.timingLimit
        || resource < 0 || resource > pri.timingLimit
        || onload < 0 || onload > pri.timingLimit
        || total < 0 || total > pri.timingLimit
        || whiteScreen < 0 || whiteScreen > pri.timingLimit
        || firstScreen < 0 || firstScreen > pri.timingLimit
        || domReady < 0 || domReady > pri.timingLimit
        || windowOnload < 0 || windowOnload > pri.timingLimit
        || humanTotal < 0 || humanTotal > pri.timingLimit) {
            return false;
        }

        return true;
    }

    /**
     * 处理公共参数(科里化)
     * @param  Function cb 回调
     * @return Object
     */
    pri.processCommonData = function processCommonData(cb) {
        pri.serviceData.channel = {
            id: pri.serviceData.channel_id,
            name: pri.reportIdMap.channel[pri.serviceData.channel_id].name,
            version: pri.serviceData.channel_version,
        };

        var ua = useragent.parse(pri.serviceData.user_agent);
        pri.serviceData.os = {
            family: ua.os.family,
            major: ua.os.major,
            minor: ua.os.minor,
        };
        pri.serviceData.browser = {
            family: ua.family,
            major: ua.major,
            minor: ua.monor,
        };

        pri.serviceData.ip = pub.request.clientIp;

        return cb;
    }

    /**
     * 处理Js上报元数据(科里化)
     * @param Function cb 回调
     * @return Function
     */
    pri.processJsMetaData = function processJsMetaData(cb) {
        return cb;
    }

    /**
     * 处理Js报错数据(科里化)
     * @param Function cb 回调
     * @return Function
     */
    pri.processJsErrorData = function processJsErrorData(cb) {
        return cb;
    }

    /**
     * 处理Api上报数据(科里化)
     * @param Function cb 回调
     * @return Function
     */
    pri.processApiErrorData = function processApiErrorData(cb) {
        return cb;
    }
}

module.exports = new ReportController();
