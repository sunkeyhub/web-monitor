/**
 * APP引导文件
 *
 * @author : Sunkey
 */

var express = require('express');
var _ = require('lodash');
var requestIp = require('request-ip');

function App() {
    // 私有对象
    var pri = {};
    // 共有对象
    var pub = this;

    // app对象
    pri.app = express();
    // 初始化标记
    pri.inited = false;
    // 日志对象
    pri.logger = null; 
    // db对象
    pri.db = null;
    // 缓存对象
    pri.cache = null;

    /**
     * 初始化中间件
     */
    pri.initMiddleware = function initMiddleware() {
        // ip 中间件，为 request 注入 clientIp 变量
        pri.app.use(requestIp.mw());
    }

    /**
     * 初始化日志
     */
    pri.initLog = function initLog() {
        var log4js = require('log4js');
        var logConfig = require(GLB.CONS.CONFIG_PATH + '/log');

        log4js.configure(logConfig);

        pub.logger = log4js.getLogger(logConfig.appenders[0].category);
    }

    /**
     * 初始化数据库
     */
    pri.initDatabase = function initDatabase() {
        var mongoose = require('mongoose');
        var dbConfig = require(GLB.CONS.CONFIG_PATH + '/database');
        var mongoConfig = dbConfig['connections']['mongo'];
        var dsn = 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db;
        var options = {
            server: mongoConfig.server
        };

        if (mongoConfig.user && mongoConfig.password) {
            options.user = mongoConfig.user;
            options.pass = mongoConfig.password;
        }

        mongoose.connect(dsn, options);

        pub.db = mongoose.connection;

        pub.db.on('connected', function() {
            console.log('success connected to ' + dsn);
        });

        pub.db.on('disconnected', function() {
            console.log('disconnected to ' + dsn);
        });

        pub.db.on('reconnected', function() {
            console.log('reconnected to ' + dsn);
        });

        pub.db.on('error', function() {
            console.log('error connected to ' + dsn);
        })
    }

    /**
     * 初始化缓存
     */
    pri.initCache = function initCache() {
        var cacheConfig = require(GLB.CONS.CONFIG_PATH + '/cache');
        var cache = null;

        pub.cache = cache;
    }

    /**
     * 初始化路由
     */
    pri.initRoute = function initRoute() {
        var routes = require(GLB.CONS.ROOT_PATH + '/app/Http/routes');
        var fs = require('fs');

        routes.forEach(function(group) {
            group.list.forEach(function(route) {
                var path = group.path + route.path;
                var groupName = group.name;


                (function(groupName, path, route) {
                    var method = route.method.toLowerCase();

                    pri.app[method](path, function(req, res, next) {
                        var routeParam = route.route.split('@');
                        var controllerName = routeParam[0];
                        var methodName = routeParam[1];
                        var controllerPath = [
                            GLB.CONS.CONTROLLER_PATH,
                            groupName,
                            controllerName,
                        ].join('/');

                        fs.exists(controllerPath + '.js', function(exists) {
                            if (!exists) {
                                res.status(404).end('Controller not exists.');
                            } else {
                                var controller = require(controllerPath);
                                if (!_.isFunction(controller.init)) {
                                    return res.end('route init error');
                                }

                                controller.init(req, res, next);

                                if (_.isFunction(controller.before)) {
                                    var beforeRt = controller.before(); 
                                    // 如果返回的不是undefined, 则说明提前终止了请求
                                    if (!_.isUndefined(beforeRt)) {
                                        return beforeRt;
                                    }
                                }

                                if (_.isFunction(controller[methodName])) {
                                    var methodRt = controller[methodName]();
                                    // 如果返回的不是undefined, 则说明提前终止了请求
                                    if (!_.isUndefined(methodRt)) {
                                        return methodRt;
                                    }
                                }

                                if (_.isFunction(controller.after)) {
                                    var afterRt = controller.after();
                                    // 如果返回的不是undefined, 则说明提前终止了请求
                                    if (!_.isUndefined(afterRt)) {
                                        return afterRt;
                                    }
                                }

                                res.end('end');
                            }
                        });
                    });
                })(groupName, path, route);
            });
        });
    }

    /**
     * 初始化应用
     */
    pri.init = function init() {
        if (pri.inited) {
            return false;
        }

        pri.initMiddleware();
        pri.initLog();
        pri.initDatabase();
        pri.initCache();
        pri.initRoute();

        pri.inited = true;
    }

    /**
     * APP运行接口
     */
    pub.run = function run() {
        var appConfig = require(GLB.CONS.CONFIG_PATH + '/app');

        // 初始化
        pri.init();

        pri.app.listen(appConfig.port);

        console.log('Server listen on ' + appConfig.port);
    }
}

module.exports = new App();
