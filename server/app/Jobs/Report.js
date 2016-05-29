/**
 * 统计数据任务
 *
 * @author : Sunkey
 */

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

    pri.factorReduce = function(factorFuncName, reduceFunc) {
        var funcObj = {};
        /**
         * osFamily性能因子
         * @return promise
         */
        funcObj.osFamily = function osFamily() {
            var factor = [
                {},
                {
                    $project: {
                        'os_family': '$os.family',
                    }
                },
                {
                    $group: {
                        _id: {
                            os_family: '$os_family',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.os_family',
                    },
                },
            ];
            return reduceFunc.call(null, 'os_family', factor);               
        }

        /**
         * osFull性能因子
         * @return promise
         */
        funcObj.osFull = function osFull() {
            var factor = [
                {},
                {
                    $project: {
                        os_full: {
                            $concat: [
                                '$os.family',
                                '_',
                                '$os.major',
                                '.',
                                '$os.minor',
                            ],
                        },                                
                    },
                },
                {
                    $group: {
                        _id: {
                            os_full: '$os_full',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.os_full',
                    },
                },
            ];
            return reduceFunc.call(null, 'os_full', factor);                
        }

        /**
         * browserFamily性能因子
         * @return promise
         */
        funcObj.browserFamily = function browserFamily() {
            var factor = [
                {},
                {
                    $project: {
                        browser_family: '$browser.family',
                    }
                },
                {
                    $group: {
                        _id: {
                            browser_family: '$browser_family',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.browser_family',
                    },
                },
            ];
            return reduceFunc.call(null, 'browser_family', factor);
        }

        /**
         * browserFull性能因子
         * @return promise
         */
        funcObj.browserFull = function browserFull() {
            var factor = [
                {},
                {
                    $project: {
                        browser_full: {
                            $concat: [
                                '$browser.family',
                                '_',
                                '$browser.major',
                                '.',
                                '$browser.minor',
                            ],
                        },                                
                    },
                },
                {
                    $group: {
                        _id: {
                            browser_full: '$browser_full',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.browser_full',
                    },
                },
            ];
            return reduceFunc.call(null, 'browser_full', factor);   
        }

        /**
         * channel性能因子
         * @return promise
         */
        funcObj.channel = function channel() {
            var factor = [
                {},
                {
                    $project: {
                        'channel_id': '$channel_id',
                    }
                },
                {
                    $group: {
                        _id: {
                            channel_id: '$channel_id',
                        }
                    },
                },
                {
                    $project: {
                        id: '$_id.channel_id',
                    },
                },
            ];
            return reduceFunc.call(null, 'channel', factor);
        }

        /**
         * networkPhase性能因子
         * @return promise
         */
        funcObj.networkPhase = function networkPhase() {
            var factor = [
                {},
                {
                    $project: {
                        network_phase: '$network.phase',
                    }
                },
                {
                    $group: {
                        _id: {
                            network_phase: '$network_phase',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.network_phase',
                    },
                },
            ];
            return reduceFunc.call(null, 'network_phase', factor);
        }

        /**
         * networkIsp性能因子
         * @return promise
         */
        funcObj.networkIsp = function networkIsp() {
            var factor = [
                {},
                {
                    $project: {
                        network_isp: '$network.isp',
                    }
                },
                {
                    $group: {
                        _id: {
                            network_isp: '$network_isp',
                        }
                    },
                },
                {
                    $project: {
                        name: '$_id.network_isp',
                    },
                },
            ];
            return reduceFunc.call(null, 'network_isp', factor);
        }       

        return funcObj[factorFuncName];
    };

    pri.statJsMeta = function statJsMeta() {
        /**
         * 聚合字段
         * @return object
         */
        function reduce() {
            /**
             * 聚合性能数据
             * @param  string key    因子键
             * @param  object factor 因子对象
             * @return promise
             */
            function timing(key, factor) {
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
                            timing_human: '$timing_human',
                            timing_performance: {
                                white_screen: {
                                    $subtract: [
                                        '$performance.timing.domLoading',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                first_screen: {
                                    $subtract: [
                                        '$performance.timing.domContentLoadedEventStart',
                                        '$performance.timing.fetchStart',
                                    ],
                                },
                                dom_ready: {
                                    $subtract: [
                                        '$performance.timing.domContentLoadedEventStart',
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
                            timing_period: {
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
                    {
                        $group: {
                            _id: {'page_id': '$page_id'},
                            'qty': {
                                $sum: 1,
                            },
                            'timing_human-white_screen': {
                                $avg: '$timing_human.white_screen',
                            },
                            'timing_human-first_screen': {
                                $avg: '$timing_human.first_screen',
                            },
                            'timing_human-dom_ready': {
                                $avg: '$timing_human.dom_ready',
                            },
                            'timing_human-window_onload': {
                                $avg: '$timing_human.window_onload',
                            },
                            'timing_human-total': {
                                $avg: '$timing_human.total',
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
                            'timing_period-total': {
                                $avg: '$timing_period.total',
                            },                               
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page_id: '$_id.page_id',
                            qty: 1,
                            timing_human: {
                                white_screen: '$timing_human-white_screen',
                                first_screen: '$timing_human-first_screen',
                                dom_ready: '$timing_human-dom_ready',
                                window_onload: '$timing_human-window_onload',
                                total: '$timing_human-total',
                            },
                            timing_performance: {
                                white_screen: '$timing_performance-white_screen',
                                first_screen: '$timing_performance-first_screen',
                                dom_ready: '$timing_performance-dom_ready',
                                window_onload: '$timing_performance-window_onload',
                                total: '$timing_performance-total',
                            },
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
                                total: '$timing_period-total',
                            },
                        },
                    },
                ]; // pipeline

                if (_.isArray(factor)) {
                    pipeline = _.merge(pipeline, factor);
                }

                return co(function *() {
                    try {
                        var docs = yield pri.reportJsMetaModel.aggregate(pipeline).exec();
                        var result = {};
                        _.forEach(docs, function(item) {
                            var pageId = item.page_id;
                            delete item.page_id;
                            if (_.isArray(factor)) {
                                if (_.isUndefined(result[pageId])) {
                                    result[pageId] = {};
                                    result[pageId][key] = [];
                                }
                                result[pageId][key].push(item);
                            } else {
                                result[pageId] = item;
                            }
                        });

                        return result;
                    } catch(err) {
                        throw err;
                    }
                });
            }

            /**
             * 聚合pv
             * @return promise
             */
            function pv() {
                var pipeline = [
                    {
                        $match: {
                            created_time: {
                                $gte: pri.startDate,
                                $lte: pri.endDate,
                            },
                        },
                    },
                    {
                        $group: {
                            _id: {page_id: '$page_id'},
                            sids: {
                                $addToSet: '$sid',
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page_id: '$_id.page_id',
                            pv: {
                                $size: '$sids',
                            },
                        },
                    },
                ];
                return co(function *() {
                    try {
                        var docs = yield pri.reportJsMetaModel.aggregate(pipeline).exec();
                        var result = {};
                        _.forEach(docs, function(item) {
                            result[item.page_id] = {
                                pv: item.pv,
                            };
                        });
                        return result;
                    } catch(err) {
                        throw err;
                    }
                });
            }

            /**
             * 聚合uv
             * @return promise
             */
            function uv() {
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
                        $group: {
                            _id: {page_id: '$page_id'},
                            uids: {
                                $addToSet: '$uid',
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page_id: '$_id.page_id',
                            uv: {
                                $size: '$uids',
                            },
                        }     
                    }
                ];

                return co(function *() {
                    try {
                        var docs = yield pri.reportJsMetaModel.aggregate(pipeline).exec();
                        var result = {};
                        _.forEach(docs, function(item) {
                            result[item.page_id] = {
                                uv: item.uv,
                            };
                        });
                        return result;
                    } catch(err) {
                        throw err;
                    }
                });
            }

            // 聚合数据
            return co(function *() {
                var reduceResult = yield [
                    pv(),
                    uv(),
                    pri.factorReduce('osFamily', timing)(),
                    pri.factorReduce('osFull', timing)(),
                    pri.factorReduce('browserFamily', timing)(),
                    pri.factorReduce('browserFull', timing)(),
                    pri.factorReduce('channel', timing)(),
                    pri.factorReduce('networkPhase', timing)(),
                    pri.factorReduce('networkIsp', timing)(),
                    timing(),
                ];

                return reduceResult;
            });
        }

        /**
         * 存储聚合结果
         * @return bool
         */
        function upsert() {
            return co(function *() {
                var reduceResult = _.reduce(yield reduce(), function(result, item) {
                    return _.merge(result, item)
                }, {});

                var dateString = moment(pri.startDate).format('YYYY-MM-DD');
                var upsertPromiseList = [];
                for(var pageId in reduceResult) {
                    var condition = {
                        page_id: +pageId, 
                        data_string: dateString,
                    }; 
                    var option = {
                        upsert: true,
                    };

                    var pageItem = reduceResult[pageId];
                    pageItem['page_id'] = +pageId;
                    pageItem['date_string'] = dateString;
                    pageItem['created_time'] = new Date();

                    upsertPromiseList.push(pri.statJsMetaModel.update(condition, pageItem, option).exec());
                }

                try {
                    var result = yield upsertPromiseList;
                    return result;
                } catch (err) {
                    throw err;
                }

            });
        }

        return upsert();
    }

    /**
     * 聚合Js报错数据
     */
    pri.statJsError = function statJsError() {
        function reduce() {
            /**
             * 聚合js报错数据
             * @return promise
             */
            function jsError(key, factor) {
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
                            msg: 1,
                            file: 1,
                        },
                    },
                    {
                        $group: {
                            _id: {
                                page_id: '$page_id',
                                msg: '$msg',
                                file_path: '$file.path',
                                file_line: '$file.line',
                                file_column: '$file.column',
                            },
                            qty: {
                                $sum: 1,
                            },
                            latest_time: {
                                $max: '$created_time',
                            }
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page_id: '$_id.page_id',
                            msg: '$_id.msg',
                            file: {
                                path: '$_id.file_path',
                                line: '$_id.file_line',
                                column: '$_id.file_column',
                            },
                            qty: 1,
                        },
                    },
                ]; // pipeline

                if (_.isArray(factor)) {
                    pipeline = _.merge(pipeline, factor);
                }

                return co(function *() {
                    try {
                        var docs = yield pri.reportJsErrorModel.aggregate(pipeline).exec();
                        var result = {};
                        _.forEach(docs, function(item) {
                            var pageId = item.page_id;
                            
                            _.unset(item, 'page_id');
                            if (_.isArray(factor)) {
                                _.isUndefined(result[pageId]) && _.set(result, `${pageId}.${key}`, []);
                                result[pageId][key].push(item);
                            } else {
                                result[pageId] = item;
                            }
                        });

                        return result;
                    } catch(err) {
                        throw err;
                    }
                });
            }

            // 聚合数据
            return co(function *() {
                var reduceResult = yield [
                    pri.factorReduce('osFull', jsError)(),
                    pri.factorReduce('browserFull', jsError)(),
                    jsError(),
                ];

                return reduceResult;
            });
        }

        function upsert() {
            return co(function *() {
                var reduceResult = _.reduce(yield reduce(), function(result, item) {
                    return _.merge(result, item)
                }, {});

                var dateString = moment(pri.startDate).format('YYYY-MM-DD');
                var upsertPromiseList = [];
                for(var pageId in reduceResult) {
                    var condition = {
                        page_id: +pageId, 
                        data_string: dateString,
                    }; 
                    var option = {
                        upsert: true,
                    };

                    var pageItem = reduceResult[pageId];
                    pageItem['page_id'] = +pageId;
                    pageItem['date_string'] = dateString;
                    pageItem['created_time'] = new Date();

                    upsertPromiseList.push(pri.statJsErrorModel.update(condition, pageItem, option).exec());
                }

                try {
                    var result = yield upsertPromiseList;
                    return result;
                } catch (err) {
                    throw err;
                }
            });
        }

        return upsert();
    }

    /**
     * 聚合Api报错数据
     */
    pri.statApiError = function statApiError() {
        function reduce() {
            function apiError(key, factor) {
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
                            api: 1,
                        },
                    },
                    {
                        $group: {
                            _id: {
                                page_id: '$page_id',
                                api_request_url: '$api.request_url',
                                api_request_method: '$api.request_method',
                                api_status_code: '$api.status_code',
                                api_request_body: '$api.request_body',
                                api_response_body: '$api.response_body',
                            },
                            qty: {
                                $sum: 1,
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page_id: '$_id.page_id',
                            api: {
                                request_url: '$_id.api_request_url',
                                request_method: '$_id.api_request_method',
                                status_code: '$_id.api_status_code',
                                request_body: '$_id.api_request_body',
                                response_body: '$_id.api_response_body',
                            },
                            qty: 1,
                        },
                    },
                ]; // pipeline

                if (_.isArray(factor)) {
                    pipeline = _.merge(pipeline, factor);
                }

                return co(function *() {
                    try {
                        var docs = yield pri.reportApiErrorModel.aggregate(pipeline).exec();
                        var result = {};
                        _.forEach(docs, function(item) {
                            var pageId = item.page_id;
                            _.unset(item, 'page_id');
                            if (_.isArray(factor)) {
                                _.isUndefined(result[pageId]) && _.set(result, `${pageId}.${key}`, []);
                                result[pageId][key].push(item);
                            } else {
                                result[pageId] = item;
                            }
                        });
                        return result;
                    } catch(err) {
                        throw err; 
                    }
                });                 
            }
            // 聚合数据
            return co(function *() {
                var reduceResult = yield [
                    pri.factorReduce('osFull', apiError)(),
                    pri.factorReduce('browserFull', apiError)(),
                    apiError(),
                ];

                return reduceResult;
            });

        }

        function upsert() {
            return co(function *() {
                var reduceResult = _.reduce(yield reduce(), function(result, item) {
                    return _.merge(result, item)
                }, {});

                var dateString = moment(pri.startDate).format('YYYY-MM-DD');
                var upsertPromiseList = [];
                for(var pageId in reduceResult) {
                    var condition = {
                        page_id: +pageId, 
                        data_string: dateString,
                    }; 
                    var option = {
                        upsert: true,
                    };

                    var pageItem = reduceResult[pageId];
                    pageItem['page_id'] = +pageId;
                    pageItem['date_string'] = dateString;
                    pageItem['created_time'] = new Date();

                    upsertPromiseList.push(pri.statApiErrorModel.update(condition, pageItem, option).exec());
                }

                try {
                    var result = yield upsertPromiseList;
                    return result;
                } catch (err) {
                    throw err;
                }
            });
        }

        return upsert();
    }

    /**
     * 接口函数
     * @param  string start 开始日期字符串
     * @param  string end   结束日期字符串
     * @return undefined
     */
    pri.processDate = function processDate(start, end) {
        // 没有传日期，则默认当日
        if (_.isUndefined(start) &&
            _.isUndefined(end)) {
            start = end = moment().format('YYYY-MM-DD');
        }

        end = _.isUndefined(end) ? end = start : end;

        if (!moment(start).isValid() ||
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
    pub.run = function run(params) {
        // 处理统计日期
        pri.processDate(params[0], params[1]);

        // 执行三种统计
        return co(function *() {
            try {
                var result = yield [
                    pri.statJsMeta(),
                    pri.statJsError(),
                    pri.statApiError(),
                ];
                console.log(result);
            } catch (err) {
                console.log(err);
            }

            process.exit(0);
        });
    }
}

module.exports = new Report();
