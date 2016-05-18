/**
 * 统计元数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statJsMetaSchema = new Schema({
    pv: {
        type: Number,
        required: true,
    },
    uv: {
        type: Number,
        required: true,
    },
    page_id: {
        type: Number,
        required: true,
    },
    os_family: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    os_full: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    browser_family: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    browser_full: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    channel: [{
        id: {
            type: Number,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    network_phase: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    network_isp: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing_human: {
            type: {},   
            required: true,
        },
        timing_performance: {
            type: {},
            required: true,
        },
        timing_period: {
            type: {},
            required: true,
        },
    }],
    timing_human: {
        type: {},
        required: true,
    },
    timing_performance: {
        type: {},
        required: true,
    },
    timing_period: {
        type: {},
        required: true,
    },
    date_string: {
        type: String,
        required: true,
    },
    updated_time: {
        type: Date, 
        default: Date.now,
    },
});

// 设置集合名称
statJsMetaSchema.set('collection', 'stat_js_meta');

var model = mongoose.model('StatJsMeta', statJsMetaSchema);

module.exports = model;
