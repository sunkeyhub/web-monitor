/**
 * 数据上报控制器
 *
 * @author : Sunkey
 */

var util = require('util');
var co = require('co');
var _ = require('lodash');
var useragent = require('useragent');
var requestIp = require('request-ip');
var Controller = require('../Controller');

function ReportController() {
    Controller.call(this);

    var self = this;

    var reportIdMap = require(GLB.CONS.ROOT_PATH + '/app/Data/ReportIdMap');
    var reportJsMetaModel = require(GLB.CONS.MODEL_PATH + '/ReportJsMetaModel');
    var reportJsErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportJsErrorModel');
    var reportApiErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportApiErrorModel');

    this.serviceOption = null;
    this.serviceData = null;

    this.before = function() {
        var query = this.request.query.q;
        if (!query) {
            GLB.app.logger.error('缺少上报参数 | ' + self.request.url);
            this.response.jsonp({code: 400, msg: '缺少上报参数q'}).end();
        }

        try {
            var queryJson = JSON.parse(query);

            if (queryJson.option && queryJson.data) {
                this.serviceOption = queryJson.option;
                this.serviceData = queryJson.data;

                if (!reportIdMap.page[this.serviceData.page_id]) {
                    self.response.jsonp({code: 400, msg: 'page_id 不存在'}).end();
                }

            } else {
                GLB.app.logger.error('上报参数不全 | 缺少option/data | ' + query);
                this.response.jsonp({code: 400, msg: '上报参数不全 | 缺少option/data'}).end();
            }
        } catch(e) {
            GLB.app.logger.error('上报参数非法 | JSON.parse | ' + e.message);
            this.response.jsonp({code: 400, msg: '上报参数非法 | ' + e.message}).end();
        } 
    };

    /**
     * 数据上报接口
     * @return Json
     */
    this.index = function() {
        switch (this.serviceOption.service_id) {
            case 1001:          // 元数据上报服务
                jsMetaService(this.serviceData);
                break;
            case 1002:          // 元数据上报服务
                jsErrorService(this.serviceData);
                break;
            case 1003:          // js错误上报服务
                apiErrorService(this.serviceData);
                break;
            default:
                this.response.status(404).end('服务不存在');
                break;
        }
    };

    /**
     * 元数据上报服务
     * @param Object 
     * @return Json
     */
    function jsMetaService(data) {
        // 校验时间数据的有效性
        if (!checkTimingValid(data)) {
            self.response.jsonp({code: 400, msg: 'timing数据无效'}).end();
        }

        // 处理数据
        data = processData(data);
        co(function *() {
            try {
                yield reportJsMetaModel.create(data);
                self.response.jsonp({code: 200});
            } catch(e) {
                GLB.app.logger.error(e.message + ' | ' + JSON.stringify(e.errors));
                self.response.jsonp({code: 400, msg: e.message + ' | ' + JSON.stringify(e.errors)}).end();
            }
        });
    };

    /**
     * js报错上报服务
     * @return Json
     */
    function jsErrorService(data) {

    };

    /**
     * api报错上报服务
     * @return Json
     */
    function apiErrorService(data) {

    };

    // 检测时间有效性
    function checkTimingValid(data, timingLimit=10000) {
        if (!data.performance
        || !data.performance.timing
        || !data.timing_human) {
            return false;
        }

        var performance = data.performance;
        var timingHuman = data.timing_human;

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

        if (cache < 0 || cache > timingLimit
        || dns < 0 || dns > timingLimit
        || tcp < 0 || tcp > timingLimit
        || request < 0 || request > timingLimit
        || response < 0 || response > timingLimit
        || domParse < 0 || domParse > timingLimit
        || script < 0 || script > timingLimit
        || domReady < 0 || domReady > timingLimit
        || resource < 0 || resource > timingLimit
        || onload < 0 || onload > timingLimit
        || total < 0 || total > timingLimit
        || whiteScreen < 0 || whiteScreen > timingLimit
        || firstScreen < 0 || firstScreen > timingLimit
        || domReady < 0 || domReady > timingLimit
        || windowOnload < 0 || windowOnload > timingLimit
        || humanTotal < 0 || humanTotal > timingLimit) {
            return false;
        }

        return true;
    }


    /**
     * 处理数据
     * @param  Object data 原始数据
     * @return Object
     */
    function processData(data) {
        data.channel = {
            id: data.channel_id,
            name: reportIdMap.channel[data.channel_id].name,
            version: data.channel_version,
        };

        data.page = {
            id: data.page_id,
            name: reportIdMap.page[data.page_id].name,
            url: data.page_url,
        };

        var ua = useragent.parse(data.user_agent);
        data.os = {
            family: ua.os.family,
            major: ua.os.major,
            minor: ua.os.minor,
        };
        data.browser = {
            family: ua.family,
            major: ua.major,
            minor: ua.monor,
        };

        data.ip = requestIp.getClientIp(self.request);

        return data;
    }
}

util.inherits(ReportController, Controller);

module.exports = new ReportController();
