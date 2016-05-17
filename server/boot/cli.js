/**
 * APP引导文件
 *
 * @author : Sunkey
 */

var express = require('express');
var _ = require('lodash');
var co = require('co');

function App() {
    var pub = this;
    var pri = {};

    // app对象
    pri.app = express();
    // 初始化标记
    pri.inited = false;
    // 日志对象
    pub.logger = null; 
    // db对象
    pub.db = null;
    // 缓存对象
    pub.cache = null;

    /**
     * 初始化中间件
     */
    pri.initMiddleware = function initMiddleware() {
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
     * 初始化应用
     */
    pri.init = function init() {
        if (!!pri.inited) {
            return false;
        }

        pri.initMiddleware();
        pri.initLog();
        pri.initDatabase();
        pri.initCache();

        pri.inited = true;
    }

    /**
     * APP运行接口
     */
    pub.run = function run() {
        // 初始化
        pri.init();

        var jobConfig = require(GLB.CONS.ROOT_PATH + '/app/Cli/jobs');
        var jobName = process.argv[2];

        if (!jobName || !jobConfig[jobName]) {
            console.log('未定义任务！');
            process.exit(1);
        }

        var job = require(GLB.CONS.JOB_PATH + '/' + jobName);

        job.run(process.argv.slice(3));
    }
}

module.exports = new App();
