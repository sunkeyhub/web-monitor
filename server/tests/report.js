/**
 * 数据上报单元测试
 *
 * @author : Sunkey
 */

var request = require('request');
var _ = require('lodash');
var envConfig = require('../.env');

var host = envConfig.APP_HOST;
var port = envConfig.APP_PORT;
var path = '/api/report';
var api = 'http://' + host + ':' + port + path;

var ua = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
    'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
    'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Safari/537.36',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
];

var pageId = [
    3001,
    3002,
    3003,
];

var channelId = [
    2001,
    2002,
    2003,
];

var networkPhase = ['2G', '3G', '4G', '5G'];
var networkIsp = ['电信', '移动', '联通'];

/**
 * 生成GUID
 * @return String
 */
function genGuidV4() {
    function s4() {
        return (((1+Math.random())*0x10000) | 0).toString(16).substring(1);
    }

    var guid =  [s4(), s4()].join('')+'-'+
                [s4(),s4(), s4()].join('-')+'-'+
                [s4(), s4(), s4()].join('');

    guid = guid.toUpperCase();

    return guid;
}

/**
 * 元数据上报
 */
describe('JsMeta', function() {
    // 正常数据测试
    it('normal data should return code 200', function(done) {
        var data = {
            option: {
                service_id: 1001,
            },
            data: {
                sid: genGuidV4(),
                uid: genGuidV4(),
                device: {
                    width: 640,
                    height: 1080,
                },
                user_agent: ua[_.random(0, 5)],
                channel_id: channelId[_.random(0, 2)],
                channel_version: '5.17',
                network_phase: networkPhase[_.random(0, 4)],
                network_isp: networkIsp[_.random(0.2)],
                page_id: pageId[_.random(0, 2)],
                page_url: 'http://www.baidu.com',
                performance: {
                    timing: {
                        connectEnd: 1459393190486,
                        connectStart: 1459393190486,
                        domComplete: 1459393191326,
                        domContentLoadedEventEnd: 1459393191303,
                        domContentLoadedEventStart: 1459393191174,
                        domInteractive: 1459393191174,
                        domLoading: 1459393190848,
                        domainLookupEnd: 1459393190486,
                        domainLookupStart: 1459393190486,
                        fetchStart: 1459393190486,
                        loadEventEnd: 1459393191327,
                        loadEventStart: 1459393191326,
                        navigationStart: 1459393190356,
                        redirectEnd: 1459393190486,
                        redirectStart: 1459393190356,
                        requestStart: 1459393190487,
                        responseEnd: 1459393190856,
                        responseStart: 1459393190839,
                        secureConnectionStart: 0,
                        unloadEventEnd: 1459393190839,
                        unloadEventStart: 1459393190839,
                    },
                },
                timing_human: {
                    white_screen: _.random(1000, 2000),
                    first_screen: _.random(1000, 2000),
                    dom_ready: _.random(2000, 3000),
                    window_onload: _.random(3000, 4000),
                    total: 5000,
                },
            },
        };

        var query = 'q=' + JSON.stringify(data);
        var url = api + '?' + query;

        request.get(url, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                var jsonBody = JSON.parse(body);
                if (jsonBody.code != 200) {
                    throw jsonBody.msg;
                }

                done();
            }

            throw err;
        });
    });
});

/**
 * JS报错数据上报
 */
describe('JsError', function() {
    // 正常数据测试
    it('normal data should return code 200', function(done) {
        var data = {
            option: {
                service_id: 1002,
            },
            data: {
                sid: genGuidV4(),
                uid: genGuidV4(),
                device: {
                    width: 640,
                    height: 1080,
                },
                user_agent: ua[_.random(0, 5)],
                channel_id: channelId[_.random(0, 2)],
                channel_version: '5.17',
                network_phase: networkPhase[_.random(0, 4)],
                network_isp: networkIsp[_.random(0.2)],
                page_id: pageId[_.random(0, 2)],
                page_url: 'http://www.baidu.com',
                msg: 'Uncaught ReferenceError: b is not defined',
                file: {
                    path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                    line: 14,
                    column: 9,
                },
                stack: [
                    "ReferenceError: b is not defined",
                    "at a (file:///Users/Sunkey/Projects/perMonitor/test.html:14:9)",
                    "at c (file:///Users/Sunkey/Projects/perMonitor/test.html:11:9)",
                    "at file:///Users/Sunkey/Projects/perMonitor/test.html:18:9",
                ],
            },
        };

        var query = 'q=' + JSON.stringify(data);
        var url = api + '?' + query;

        request.get(url, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                var jsonBody = JSON.parse(body);
                if (jsonBody.code != 200) {
                    throw jsonBody.msg;
                }

                done();
            }

            throw err;
        });
    });
});

/**
 * 接口报错数据上报
 */
describe('ApiError', function() {
    // 正常数据测试
    it('normal data should return code 200', function(done) {
        var data = {
            option: {
                service_id: 1003,
            },
            data: {
                sid: genGuidV4(),
                uid: genGuidV4(),
                device: {
                    width: 640,
                    height: 1080,
                },
                user_agent: ua[_.random(0, 5)],
                channel_id: channelId[_.random(0, 2)],
                channel_version: '5.17',
                network_phase: networkPhase[_.random(0, 4)],
                network_isp: networkIsp[_.random(0.2)],
                page_id: pageId[_.random(0, 2)],
                page_url: 'http://www.baidu.com',
                msg: 'Uncaught ReferenceError: c is not defined',
                file: {
                    path: 'file:///Users/Sunkey/Projects/perMonitor/test.html',
                    line: 14,
                    column: 9,
                },
                api: {
                    url: 'http://www.baidu.com',
                    param: 'xxx',
                    status_code: 500,
                    response: 'ooo',
                },
            },
        };

        var query = 'q=' + JSON.stringify(data);
        var url = api + '?' + query;

        request.get(url, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                var jsonBody = JSON.parse(body);
                if (jsonBody.code != 200) {
                    throw jsonBody.msg;
                }

                done();
            }

            throw err;
        });
    });
});
