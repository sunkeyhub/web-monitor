/**
 * 统计数据工作
 *
 * @author : Sunkey
 */

var _ = require('lodash');
var co = require('co');
var moment = require('moment');

function Report() {
    var pub = this;
    var pri = {};

    pri.reportJsMetaModel = require(GLB.CONS.MODEL_PATH + '/ReportJsMetaModel');
    pri.reportJsErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportJsErrorModel');
    pri.reportApiErrorModel = require(GLB.CONS.MODEL_PATH + '/ReportApiErrorModel');
    pri.statJsMetaModel = require(GLB.CONS.MODEL_PATH + '/StatJsMetaModel');
    pri.statJsErrorModel = require(GLB.CONS.MODEL_PATH + '/StatJsErrorModel');
    pri.statApiErrorModel = require(GLB.CONS.MODEL_PATH + '/StatApiErrorModel');

    pri.startDate = null;
    pri.endDate = null;

    pri.statJsMeta = function reduceJsMeta() {
        function reduceTiming(factor) {
            var pipeline = [
                {
                    $match: {
                        created_time: {
                            $gte: pri.startDate,
                            $lte: pri.endDate,
                        }
                    },
                },
                {
                    $project: {
                        page_id: 1,
                        timing: {
                            human: '$timing_human',
                            performance: {
                                white_screen: {
                                    $subtract: [
                                        '$performance.timing.domLoading',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                first_screen: {
                                    $subtract: [
                                        '$performance.timing.domContentLoadedStart',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                dom_ready: {
                                    $subtract: [
                                        '$performance.timing.domContentLoadedEnd',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                window_onload: {
                                    $subtract: [
                                        '$performance.timing.loadEventStart',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                total: {
                                    $subtract: [
                                        '$performance.timing.loadEventEnd',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                            },
                            period: {
                                cache: {
                                    $subtract: [
                                        '$performance.timing.domainLookupStart',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                dns: {
                                    $subtract: [
                                        '$performance.timing.domainLookupEnd',
                                        '$performance.timing.domainLookupStart',
                                    ]
                                },
                                tcp: {
                                    $subtract: [
                                        '$performance.timing.connectEnd',
                                        '$performance.timing.connectStart',
                                    ],
                                },
                                request: {
                                    $subtract: [
                                        '$performance.timing.responseStart',
                                        '$performance.timing.requestStart',
                                    ],
                                },
                                response: {
                                    $subtract: [
                                        '$performance.timing.responseEnd',
                                        '$performance.timing.responseStart',
                                    ],
                                },
                                dom_parse: {
                                    $subtract: [
                                        '$performance.timing.domInteractive',
                                        '$performance.timing.domLoading'
                                    ],
                                },
                                script: {
                                    $subtract: [
                                        '$performance.timing.domContentLoadedEventStart',
                                        '$performance.timing.domInteractive',
                                    ],
                                },
                                dom_ready: {
                                    $subtract: [
                                        '$performance.timing.responseEnd',
                                        '$performance.timing.responseStart',
                                    ],
                                },
                                resource: {
                                    $subtract: [
                                        '$performance.timing.domComplete',
                                        '$performance.timing.domContentLoadedEventEnd',
                                    ],
                                },
                                window_onload: {
                                    $subtract: [
                                        '$performance.timing.loadEventEnd',
                                        '$performance.timing.loadEventStart',
                                    ],
                                },
                                total: {
                                    $subtract: [
                                        '$performance.timing.loadEventEnd',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: {'page_id': '$page_id'},
                        'qty': {
                            $sum: 1,
                        },
                        'timing-human-white_screen': {
                            $avg: '$timing.human.white_screen',
                        },
                        'timing-human-first_screen': {
                            $avg: '$timing.human.first_screen',
                        },
                        'timing-human-dom_ready': {
                            $avg: '$timing.human.dom_ready',
                        },
                        'timing-human-window_onload': {
                            $avg: '$timing.human.window_onload',
                        },
                        'timing-human-total': {
                            $avg: '$timing.human.total',
                        },
                        'timing-performance-white_screen': {
                            $avg: '$timing.performance.white_screen',
                        },
                        'timing-performance-first_screen': {
                            $avg: '$timing.performance.first_screen',
                        },
                        'timing-performance-dom_ready': {
                            $avg: '$timing.performance.dom_ready',
                        },
                        'timing-performance-window_onload': {
                            $avg: '$timing.performance.window_onload',
                        },
                        'timing-performance-total': {
                            $avg: '$timing.performance.total',
                        },
                        'timing-period-cache': {
                            $avg: '$timing.period.cache',
                        },
                        'timing-period-dns': {
                            $avg: '$timing.period.dns',
                        },
                        'timing-period-tcp': {
                            $avg: '$timing.period.tcp',
                        },
                        'timing-period-request': {
                            $avg: '$timing.period.request',
                        },
                        'timing-period-response': {
                            $avg: '$timing.period.response',
                        },
                        'timing-period-dom_parse': {
                            $avg: '$timing.period.dom_parse',
                        },
                        'timing-period-script': {
                            $avg: '$timing.period.script',
                        },
                        'timing-period-dom_ready': {
                            $avg: '$timing.period.dom_ready',
                        },
                        'timing-period-resource': {
                            $avg: '$timing.period.resource',
                        },
                        'timing-period-window_onload': {
                            $avg: '$timing.period.window_onload',
                        },
                        'timing-period-total': {
                            $avg: '$timing.period.total',
                        },                               
                    },
                },
            ]; // pipeline

            if (!_.isUndefined(factor)) {
                pipeline[1]['$project'][factor.split('.')[0]] = 1;
                pipeline[2]['$group']['_id'][factor.replace('.', '_')] = '$' + factor;
            }

            co(function *() {
                try {
                    var docs = yield pri.reportJsMetaModel.aggregate(pipeline).exec();
                    console.log(docs);
                } catch(err) {
                    console.log(err);
                }
            });
        }

        reduceTiming('os.family');

        function reduceOsTiming() {

        }

        function reduceBrowserTiming() {

        }

        function reduceNetworkTiming() {

        }
    }

    pri.statJsError = function reduceJsError() {

    }

    pri.statApiError = function reduceApiError() {

    }

    /**
     * 接口函数
     * @param  string start 开始日期字符串
     * @param  string end   结束日期字符串
     * @return undefined
     */
    pri.processDate = function processDate(start, end) {
        if (_.isUndefined(start) ||
            _.isUndefined(end) ||
            !moment(start).isValid() ||
            !moment(end).isValid() ||
            moment(end).isBefore(start)
        ) {
            throw new Error('日期参数非法~');
            process.exit(0);
        }        

        pri.startDate = moment(start).startOf('day').toDate();
        pri.endDate = moment(end).endOf('day').toDate();
    }

    /**
     * 接口函数
     * @param  string start 开始日期字符串
     * @param  string end   结束日期字符串
     * @return undefined
     */
    pub.run = function run(start, end = start) {
        // 处理统计日期
        pri.processDate(start, end);

        pri.statJsMeta();
        pri.statJsError();
        pri.statApiError();
    }
}

module.exports = new Report();
