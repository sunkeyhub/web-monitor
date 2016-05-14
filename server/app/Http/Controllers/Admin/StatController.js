/**
 * 后台数据接口控制器
 *
 * @author : Sunkey
 */

var util = require('util');
var Controller = require('../Controller');

function StatController() {
    Controller.call(this);

    this.before = function() {

    };

    /**
     * 数据上报接口
     * @return json
     */
    this.overview = function() {
        this.response.end('overview');
    };
}

util.inherits(StatController, Controller);

module.exports = new StatController();
