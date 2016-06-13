/**
 * APP引导文件
 *
 * @author : Sunkey
 */

const express = require('express');
const requestIp = require('request-ip');
const bluebird = require('bluebird');
const fs = require('fs');
const redis = require('redis');
const mongoose = require('mongoose');
const log4js = require('log4js');

const logConfig = require(GLB.CONS.CONFIG_PATH + '/log');
const dbConfig = require(GLB.CONS.CONFIG_PATH + '/database');
const cacheConfig = require(GLB.CONS.CONFIG_PATH + '/cache');
const routesConfig = require(GLB.CONS.ROOT_PATH + '/app/Http/routes');
const appConfig = require(GLB.CONS.CONFIG_PATH + '/app');

// 定义私有变量名
const app = Symbol('VAL.app');
const inited = Symbol('VAL.inited');

// 定义私有函数名
const initMiddleware = Symbol('FUNC.initMiddleware');
const initLog = Symbol('FUNC.initLog');
const initDatabase = Symbol('FUNC.initDatabase');
const initCache = Symbol('FUNC.initCache');
const initRoute = Symbol('FUNC.initRoute');
const init = Symbol('FUNC.init');

class App {
    constructor() {
        this[app]  = express();
        this[inited] = false;
        this.logger = null;
        this.db = null;
        this.cache = null;
    }

    /**
     * 初始化日志
     */
    [initLog]() {
        log4js.configure(logConfig);
        this.logger = log4js.getLogger(logConfig.appenders[0].category);
    }

    /**
     * 初始化中间件
     */
    [initMiddleware]() {
        // ip 中间件，为 request 注入 clientIp 变量
        this[app].use(requestIp.mw());
    }

    /**
     * 初始化数据库
     */
    [initDatabase]() {
        if (!dbConfig.driver) {
            return false;
        }

        const mongoConfig = dbConfig['connections']['mongo'];
        const dsn = 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db;
        let options = {
            server: mongoConfig.server
        };

        if (mongoConfig.user && mongoConfig.password) {
            options.user = mongoConfig.user;
            options.pass = mongoConfig.password;
        }

        mongoose.connect(dsn, options);

        this.db = mongoose.connection;

        this.db.on('connected', function() {
            this.logger.info('success connected to ' + dsn);
        });

        this.db.on('disconnected', function() {
            this.logger.info('disconnected to ' + dsn);
        });

        this.db.on('reconnected', function() {
            this.logger.info('reconnected to ' + dsn);
        });

        this.db.on('error', function() {
            this.logger.error('error connected to ' + dsn);
        });
    }

    /**
     * 初始化缓存
     */
    [initCache]() {
        if (!cacheConfig.driver) {
            return false;
        }

        const redisConfig = cacheConfig['connections']['redis'];

        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);

        this.cache = redis.createClient(redisConfig);

        this.cache.on('error', function(err) {
            this.logger.error(err);
        });
    }

    /**
     * 初始化路由
     */
    [initRoute]() {
        _.forEach(routesConfig, (group) => {
            _.forEach(group.list, (route) => {
                const path = group.path + route.path;
                const namespace = group.namespace;
                const method = route.method.toLowerCase();

                this[app][method](path, (req, res, next) => {
                    const routeParam = route.route.split('@');
                    const controllerName = routeParam[0];
                    const methodName = routeParam[1];
                    const controllerPath = [
                        GLB.CONS.CONTROLLER_PATH,
                        namespace,
                        controllerName,
                    ].join('/');

                    fs.exists(controllerPath + '.js', (exists) => {
                        if (!exists) {
                            return res.status(404).end('Controller not exists.');
                        } else {
                            const controller = require(controllerPath);

                            if (!_.isFunction(controller.init)) {
                                return res.end('route init error');
                            }

                            controller.init(req, res, next);

                            return co(function *() {
                                let beforeRt = undefined;
                                let methodRt = undefined;
                                let afterRt = undefined;

                                if (_.isGenerator(controller.before)) {
                                    try {
                                        beforeRt = yield co(controller.before);
                                    } catch (err) {
                                        this.logger.error(err);
                                    }
                                } else if (_.isFunction(controller.before)) {
                                    beforeRt = controller.before(); 
                                    if (_.isInstance(beforeRt, Promise)) {
                                        try {
                                            beforeRt = yield beforeRt; 
                                        } catch (err) {
                                            this.logger.error(err);
                                        }
                                    }
                                }
                                // 如果返回的不是undefined, 则说明提前终止了请求
                                if (!_.isUndefined(beforeRt)) {
                                    return beforeRt;
                                }

                                if (_.isGenerator(controller[methodName])) {
                                    try {
                                        methodRt = yield co(controller[methodName].bind(controller));
                                    } catch (err) {
                                        this.logger.error(err);
                                    }
                                } else if (_.isFunction(controller[methodName])) {
                                    methodRt = controller[methodName]();
                                    if (_.isInstance(methodRt, Promise)) {
                                        try {
                                            methodRt = yield methodRt;
                                        } catch (err) {
                                            this.logger.error(err);
                                        }
                                    }
                                }
                                // 如果返回的不是undefined, 则说明提前终止了请求
                                if (!_.isUndefined(methodRt)) {
                                    return methodRt;
                                }

                                if (_.isGenerator(controller.after)) {
                                    try {
                                        afterRt = yield co(controller.after);
                                    } catch (err) {
                                        this.logger.error(err);
                                    }
                                } else if (_.isFunction(controller.after)) {
                                    afterRt = controller.after();
                                    if (_.isInstance(afterRt, Promise)) {
                                        try {
                                            afterRt = yield afterRt; 
                                        } catch (err) {
                                            this.logger.error(err);
                                        }
                                    }
                                }
                                // 如果返回的不是undefined, 则说明提前终止了请求
                                if (!_.isUndefined(afterRt)) {
                                    return afterRt;
                                }

                                res.end();
                            }.bind(this)).then(() => {
                                console.log('route success');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }
                    });
                });
            });
        });

        this[app].get('*', function(req, res) {
            res.redirect('/welcome/index');
        });
    }

    /**
     * 初始化应用
     */
    [init]() {
        if (!!this[inited]) {
            return false;
        }

        this[initLog]();
        this[initMiddleware]();
        this[initDatabase]();
        this[initCache]();
        this[initRoute]();

        this[inited] = true;
    }

    /**
     * APP运行接口
     */
    run() {
        // 初始化
        this[init]();
        this[app].listen(appConfig.port);

        console.log('Server listen on ' + appConfig.port);
    }
}

module.exports = new App();
