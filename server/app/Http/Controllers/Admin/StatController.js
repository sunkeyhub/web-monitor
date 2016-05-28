/**
 * 后台数据接口控制器
 *
 * @author : Sunkey
 */

var BaseController = require(GLB.CONS.COMPONENT_PATH + '/Controllers/BaseController');
var report = require(GLB.CONS.ROOT_PATH + '/app/Data/Report');

function StatController() {
    BaseController.call(this);
    var pri = {};
    var pub = this;

    pri.reportJsMetaModel = require(GLB.CONS.MODEL_PATH + '/ReportJsMetaModel');
    pri.statJsMetaModel = require(GLB.CONS.MODEL_PATH + '/StatJsMetaModel');
    pri.statJsErrorModel = require(GLB.CONS.MODEL_PATH + '/StatJsErrorModel');
    pri.statApiErrorModel = require(GLB.CONS.MODEL_PATH + '/StatApiErrorModel');


    pub.before = function before() {
        var pageId = pub.request.query.page_id;
        var startDate = pub.request.query.start_date;
        var endDate = pub.request.query.end_date;

        if (!pageId ||
            !moment(startDate).isValid() ||
            !moment(endDate).isValid()) {
            return pub.response.status(400).end('参数错误！')
        }

        pri.startDate = startDate;
        pri.endDate = endDate;
        pri.pageId = pageId;
    };

    /**
     * 获取概览数据接口
     * @return json
     */
    pub.overview = function overview() {
        return co(function *() {
            try {
                var data = yield pri.reduceOverview();
                return pub.response.json({code: 200, data: data});
            } catch(err) {
                GLB.app.logger.info(JSON.stringify(err));
                return pub.response.json({code: 500});
            }
        });
    };

    /**
     * 聚合概览数据
     * @return Promise
     */
    pri.reduceOverview = function reduceOverview() {
        var pPvuv = [
            {
                $match: {
                    page_id: +pri.pageId,
                    created_time: {
                        $gte: moment(pri.startDate).startOf('day').toDate(),
                        $lte: moment(pri.endDate).endOf('day').toDate(),
                    },
                },
            },
            {
                $project: {
                    sid: 1,
                    uid: 1,
                },
            },
            {
                $group: {
                    _id: null,
                    sids: {
                        $addToSet: '$sid',
                    },
                    uids: {
                        $addToSet: '$uid',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    pv: {
                        $size: '$sids',
                    },
                    uv: {
                        $size: '$uids',
                    },
                },
            },            
        ];

        var match = {
            page_id: +pri.pageId,
            date_string: {
                $gte: pri.startDate,
                $lte: pri.endDate,
            },
        };

        var pJsMeta = [
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        date_string: '$date_string',
                    },
                    timing: {
                        $avg: '$timing_performance.total',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    date_string: '$_id.date_string',
                    timing: 1,
                },
            },
            {
                $sort: {
                    date_string: 1,
                },
            },
        ];
        var pJsError = [
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        date_string: '$date_string',
                    },
                    js_error: {
                        $sum: '$qty',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    date_string: '$_id.date_string',
                    js_error: 1,
                },
            },
            {
                $sort: {
                    date_string: 1,
                },
            },
        ];

        var pApiError = [
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        date_string: '$date_string',
                    },
                    api_error: {
                        $sum: '$qty',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    date_string: '$_id.date_string',
                    api_error: 1,
                },
            },
            {
                $sort: {
                    date_string: 1,
                },
            },
        ];

        return co(function *() {
            var result = yield [
                pri.reportJsMetaModel.aggregate(pPvuv).exec(),
                pri.statJsMetaModel.aggregate(pJsMeta).exec(),
                pri.statJsErrorModel.aggregate(pJsError).exec(),
                pri.statApiErrorModel.aggregate(pApiError).exec(),
            ];

            var data = {
                visit: {
                    pv: 0,
                    uv: 0,
                    timing: 0,
                    js_error: 0,
                    api_error: 0,
                },
                timing: {},
                js_error: {},
                api_error: {},
            };

            var pvUv = result[0],
                jsMeta = result[1],
                jsError = result[2],
                apiError = result[3];

            if (pvUv.length > 0) {
                data.visit.pv = pvUv[0].pv;
                data.visit.uv = pvUv[0].uv;
            }

            if (jsMeta.length > 0) {
                _.forEach(jsMeta, function(item) {
                    data.visit.timing += item.timing;
                    data.timing[moment(item.date_string).format('MM-DD')] = item.timing;
                });
                data.visit.timing /= jsMeta.length;
            }

            if (jsError.length > 0) {
                _.forEach(jsError, function(item) {
                    data.visit.js_error += item.js_error;
                    data.js_error[moment(item.date_string).format('MM-DD')] = item.js_error;
                });
            }

            if (apiError.length > 0) {
                _.forEach(apiError, function(item) {
                    data.visit.api_error += item.api_error;
                    data.api_error[moment(item.date_string).format('MM-DD')] = item.api_error;
                });                
            }

            return data;
        });
    }

    /**
     * 获取性能数据接口
     * @return json
     */
    pub.timing = function timing() {
        var factor = pub.request.query.factor;
        return co(function *() {
            var data = yield pri.reduceTiming(factor);
            return pub.response.json({code: 200, data: data});
        });
    }

    /**
     * 聚合timing数据
     * @return Promise
     */
    pri.reduceTiming = function reduceTiming(factor) {
        var match = {
            page_id: +pri.pageId,
            date_string: {
                $gte: pri.startDate,
                $lte: pri.endDate,
            },
        };

        var pAll = [
            {
                $match: match,
            },
            {
                $group: {
                    _id: {
                        date_string: '$date_string',
                    },
                    timing: {
                        $avg: '$timing_period.total',
                    },
                    'timing_performance-white_screen': {
                        $avg: '$timing_performance.white_screen',
                    },
                    'timing_performance-first_screen': {
                        $avg: '$timing_performance.first_screen',
                    },
                    'timing_performance-dom_ready': {
                        $avg: '$timing_performance.dom_ready',
                    },
                    'timing_performance-window_onload': {
                        $avg: '$timing_performance.window_onload',
                    },
                    'timing_performance-total': {
                        $avg: '$timing_performance.total',
                    },
                    'timing_period-cache': {
                        $avg: '$timing_period.cache',
                    },
                    'timing_period-dns': {
                        $avg: '$timing_period.dns',
                    },
                    'timing_period-tcp': {
                        $avg: '$timing_period.tcp',
                    },
                    'timing_period-request': {
                        $avg: '$timing_period.request',
                    },
                    'timing_period-response': {
                        $avg: '$timing_period.response',
                    },
                    'timing_period-dom_parse': {
                        $avg: '$timing_period.dom_parse',
                    },
                    'timing_period-script': {
                        $avg: '$timing_period.script',
                    },
                    'timing_period-dom_ready': {
                        $avg: '$timing_period.dom_ready',
                    },
                    'timing_period-resource': {
                        $avg: '$timing_period.resource',
                    },
                    'timing_period-window_onload': {
                        $avg: '$timing_period.window_onload',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    date_string: '$_id.date_string',
                    timing: 1,
                    timing_period: {
                        cache: '$timing_period-cache',
                        dns: '$timing_period-dns',
                        tcp: '$timing_period-tcp',
                        request: '$timing_period-request',
                        response: '$timing_period-response',
                        dom_parse: '$timing_period-dom_parse',
                        script: '$timing_period-script',
                        dom_ready: '$timing_period-dom_ready',
                        resource: '$timing_period-resource',
                        window_onload: '$timing_period-window_onload',
                    },
                    timing_performance: {
                        white_screen: '$timing_performance-white_screen',
                        first_screen: '$timing_performance-first_screen',
                        dom_ready: '$timing_performance-dom_ready',
                        window_onload: '$timing_performance-window_onload',
                    }, 
                },
            },
            {
                $sort: {
                    date_string: 1,
                },
            },
        ];

        var pOsFull = [
            {
                $match: match,
            },
            {
                $project: {
                    date_string: 1,
                    os_full: 1,
                }
            },
            {
                $unwind: '$os_full',
            },
            {
                $group: {
                    _id: {
                        date_string: '$date_string',
                        name: '$os_full.name',
                    },
                    timing: {
                        $avg: '$os_full.timing_period.total',
                    },
                    'timing_performance-white_screen': {
                        $avg: '$os_full.timing_performance.white_screen',
                    },
                    'timing_performance-first_screen': {
                        $avg: '$os_full.timing_performance.first_screen',
                    },
                    'timing_performance-dom_ready': {
                        $avg: '$os_full.timing_performance.dom_ready',
                    },
                    'timing_performance-window_onload': {
                        $avg: '$os_full.timing_performance.window_onload',
                    },
                    'timing_performance-total': {
                        $avg: '$os_full.timing_performance.total',
                    },
                    'timing_period-cache': {
                        $avg: '$os_full.timing_period.cache',
                    },
                    'timing_period-dns': {
                        $avg: '$os_full.timing_period.dns',
                    },
                    'timing_period-tcp': {
                        $avg: '$os_full.timing_period.tcp',
                    },
                    'timing_period-request': {
                        $avg: '$os_full.timing_period.request',
                    },
                    'timing_period-response': {
                        $avg: '$os_full.timing_period.response',
                    },
                    'timing_period-dom_parse': {
                        $avg: '$os_full.timing_period.dom_parse',
                    },
                    'timing_period-script': {
                        $avg: '$os_full.timing_period.script',
                    },
                    'timing_period-dom_ready': {
                        $avg: '$os_full.timing_period.dom_ready',
                    },
                    'timing_period-resource': {
                        $avg: '$os_full.timing_period.resource',
                    },
                    'timing_period-window_onload': {
                        $avg: '$os_full.timing_period.window_onload',
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id.name',
                    date_string: '$_id.date_string',
                    timing: 1,
                    timing_period: {
                        cache: '$timing_period-cache',
                        dns: '$timing_period-dns',
                        tcp: '$timing_period-tcp',
                        request: '$timing_period-request',
                        response: '$timing_period-response',
                        dom_parse: '$timing_period-dom_parse',
                        script: '$timing_period-script',
                        dom_ready: '$timing_period-dom_ready',
                        resource: '$timing_period-resource',
                        window_onload: '$timing_period-window_onload',
                    },
                    timing_performance: {
                        white_screen: '$timing_performance-white_screen',
                        first_screen: '$timing_performance-first_screen',
                        dom_ready: '$timing_performance-dom_ready',
                        window_onload: '$timing_performance-window_onload',
                    },
                },
            },
            {
                $sort: {
                    date_string: 1,
                },
            },
        ];

        var pBrowserFull = _.cloneDeep(pOsFull);
        pBrowserFull[1]['$project'] = {
            browser_full: 1,
            date_string: 1,
        };
        pBrowserFull[2] = {
            $unwind: '$browser_full',
        };
        pBrowserFull[3]['$group'] = {
            _id: {
                date_string: '$date_string',
                name: '$browser_full.name',         
            },
            timing: {
                $avg: '$browser_full.timing_period.total',
            },
            'timing_performance-white_screen': {
                $avg: '$browser_full.timing_performance.white_screen',
            },
            'timing_performance-first_screen': {
                $avg: '$browser_full.timing_performance.first_screen',
            },
            'timing_performance-dom_ready': {
                $avg: '$browser_full.timing_performance.dom_ready',
            },
            'timing_performance-window_onload': {
                $avg: '$browser_full.timing_performance.window_onload',
            },
            'timing_performance-total': {
                $avg: '$browser_full.timing_performance.total',
            },
            'timing_period-cache': {
                $avg: '$browser_full.timing_period.cache',
            },
            'timing_period-dns': {
                $avg: '$browser_full.timing_period.dns',
            },
            'timing_period-tcp': {
                $avg: '$browser_full.timing_period.tcp',
            },
            'timing_period-request': {
                $avg: '$browser_full.timing_period.request',
            },
            'timing_period-response': {
                $avg: '$browser_full.timing_period.response',
            },
            'timing_period-dom_parse': {
                $avg: '$browser_full.timing_period.dom_parse',
            },
            'timing_period-script': {
                $avg: '$browser_full.timing_period.script',
            },
            'timing_period-dom_ready': {
                $avg: '$browser_full.timing_period.dom_ready',
            },
            'timing_period-resource': {
                $avg: '$browser_full.timing_period.resource',
            },
            'timing_period-window_onload': {
                $avg: '$browser_full.timing_period.window_onload',
            },
        };

        switch (factor) {
            case 'all': {
                var pipeline = pAll;
                break;
            }
            case 'os_full': {
                var pipeline = pOsFull;
                break;
            }
            case 'browser_full': {
                var pipeline = pBrowserFull;
                break;
            }
        }

        return co(function *() {
            try {
                var result = yield pri.statJsMetaModel.aggregate(pipeline).exec();
            } catch(err) {
                console.log(err);
            }
            var timing = {
                trend: {},
                period: {},
                performance: {},
            };
            if (factor === 'all') {
                timing.trend.all = {};
                timing.period.all = {};
                timing.performance.all = {};
                _.forEach(result, function(item) {
                    timing.trend.all[moment(item.date_string).format('MM-DD')] = item.timing;
                    _.forOwn(item.timing_period, function(value, key) {
                        timing.period.all[key] = {};
                        timing.period.all[key][moment(item.date_string).format('MM-DD')] = value;
                    });
                    _.forOwn(item.timing_performance, function(value, key) {
                        timing.performance.all[key] = {};
                        timing.performance.all[key][moment(item.date_string).format('MM-DD')] = value;
                    });
                });
            } else {
                _.forEach(result, function(item) {
                    if (_.isUndefined(timing.trend[item.name])) {
                        timing.trend[item.name] = {};
                    }
                    if (_.isUndefined(timing.period[item.name])) {
                        timing.period[item.name] = {};
                    }
                    if (_.isUndefined(timing.performance[item.name])) {
                        timing.performance[item.name] = {};
                    }
                    timing.trend[item.name][moment(item.date_string).format('MM-DD')] = item.timing;
                    _.forOwn(item.timing_period, function(value, key) {
                        if (_.isUndefined(timing.period[item.name][key])) {
                            timing.period[item.name][key] = {};
                        }
                        timing.period[item.name][key][moment(item.date_string).format('MM-DD')] = value;
                    });
                    _.forOwn(item.timing_performance, function(value, key) {
                        if (_.isUndefined(timing.performance[item.name][key])) {
                            timing.performance[item.name][key] = {};
                        }
                        timing.performance[item.name][key][moment(item.date_string).format('MM-DD')] = value;
                    });
                });

                _.forOwn(timing.period, function(value, key) {
                    _.forOwn(value, function(subVal, subKey) {
                        var arr = _.values(subVal)
                       timing.period[key][subKey] = _.sum(arr)/arr.length;
                    });
                });
                _.forOwn(timing.performance, function(value, key) {
                    _.forOwn(value, function(subVal, subKey) {
                        var arr = _.values(subVal)
                        timing.performance[key][subKey] = _.sum(arr)/arr.length;
                    });
                });
            }

            return timing;
        });
    }
}

module.exports = new StatController();
