/**
 * 后台数据接口控制器
 *
 * @author : Sunkey
 */

var _ = require('lodash');
var co = require('co');
var BaseController = require(GLB.CONS.COMPONENT_PATH + '/Controllers/BaseController');
var reportIdMap = require(GLB.CONS.ROOT_PATH + '/app/Data/ReportIdMap');
var moment = require('moment');

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
                    pv: 1,
                    uv: 1,
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
        pub.response.end('timing');
    }

    /**
     * 聚合timing数据
     * @return Promise
     */
    pri.reduceTiming = function reduceTiming() {

    }
}

module.exports = new StatController();
