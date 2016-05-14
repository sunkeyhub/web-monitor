/**
 * APP引导文件
 *
 * @author : Sunkey
 */
function App() {
    var express = require('express');
    var app = express();

    var self = this;

    this.logger = null; 
    this.db = null;
    this.cache = null;

    // 初始化标记
    var inited = false; 

    /**
     * 初始化日志
     */
    function initLog() {
        var log4js = require('log4js');
        var logConfig = require(GLB.CONS.CONFIG_PATH + '/log');

        log4js.configure(logConfig);

        self.logger = log4js.getLogger(logConfig.appenders[0].category);
    }

    /**
     * 初始化数据库
     */
    function initDatabase() {
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

        self.db = mongoose.connection;

        self.db.on('connected', function() {
            console.log('success connected to ' + dsn);
        });

        self.db.on('disconnected', function() {
            console.log('disconnected to ' + dsn);
        });

        self.db.on('reconnected', function() {
            console.log('reconnected to ' + dsn);
        });

        self.db.on('error', function() {
            console.log('error connected to ' + dsn);
        })
    }

    /**
     * 初始化缓存
     */
    function initCache() {
        var cacheConfig = require(GLB.CONS.CONFIG_PATH + '/cache');
        var cache = null;

        self.cache = cache;
    }

    /**
     * 初始化路由
     */
    function initRoutes() {
        var routes = require(GLB.CONS.ROOT_PATH + '/app/Http/routes');
        var fs = require('fs');

        routes.forEach(function(group) {
            group.list.forEach(function(route) {
                var path = group.path + route.path;
                var groupName = group.name;


                (function(groupName, path, route) {
                    var method = route.method.toLowerCase();

                    app[method](path, function(req, res, next) {
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

                                controller.init(req, res, next);
                                controller.before && controller.before();
                                typeof controller[methodName] === 'function' ?
                                    controller[methodName]() :
                                    res.status(404).end('Method not exists.');
                                controller.after && controller.after();
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
    function init() {
        if (inited) {
            return false;
        }

        initLog();
        initDatabase();
        initCache();
        initRoutes();
    }

    this.run = function() {
        var appConfig = require(GLB.CONS.CONFIG_PATH + '/app');

        // 初始化
        init();

        app.listen(appConfig.port);

        console.log('Server listen on ' + appConfig.port);
    }
}

module.exports = new App();
