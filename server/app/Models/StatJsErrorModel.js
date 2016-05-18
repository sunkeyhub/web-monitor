/**
 * 统计Js报错数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statJsErrorSchema = new Schema({
    page_id: {
        type: Number,
        required: true,
    },
    os_full: [{
        qty: {
            type: Number,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        file: {
            path: {
                type: String,
                required: true,           
            },
            line: {
                type: Number,
                required: true,
            },
            column: {
                type: Number,
                required: true,
            },
        },
    }],
    browser_full: [{
        qty: {
            type: Number,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        file: {
            path: {
                type: String,
                required: true,           
            },
            line: {
                type: Number,
                required: true,
            },
            column: {
                type: Number,
                required: true,
            },
        },
    }],
    channel_id: [{
        qty: {
            type: Number,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        file: {
            path: {
                type: String,
                required: true,           
            },
            line: {
                type: Number,
                required: true,
            },
            column: {
                type: Number,
                required: true,
            },
        },
    }],
    qty: {
        type: Number,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    file: {
        path: {
            type: String,
            required: true,           
        },
        line: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
    },
    date_string: {
        type: String,
        required: true,
    },
    created_time: {
        type: Date, 
        default: Date.now,
    },
});

// 设置集合名称
statJsErrorSchema.set('collection', 'stat_js_error');

var model = mongoose.model('StatJsError', statJsErrorSchema);

module.exports = model;
