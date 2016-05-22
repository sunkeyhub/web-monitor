/**
 * 统计Api报错数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statApiErrorSchema = new Schema({
    page_id: {
        type: Number,
        required: true,
    },
    os_full: [{
        name: {
            type: String, 
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        api: {
           request_url: {
                type: String,
                required: true,
            },
            request_method: {
                type: String,
                required: true,
            },
            status_code: {
                type: Number,
                required: true,
            },
            request_body: {
                type: String, 
                default: '',
            },
            response_body: {
                type: String,
                default: '',
            },
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
        api: {
           request_url: {
                type: String,
                required: true,
            },
            request_method: {
                type: String,
                required: true,
            },
            status_code: {
                type: Number,
                required: true,
            },
            request_body: {
                type: String, 
                default: '',
            },
            response_body: {
                type: String,
                default: '',
            },
        },
    }],
    qty: {
        type: Number,
        required: true,
    },
    api: {
       request_url: {
            type: String,
            required: true,
        },
        request_method: {
            type: String,
            required: true,
        },
        status_code: {
            type: Number,
            required: true,
        },
        request_body: {
            type: String, 
            default: '',
        },
        response_body: {
            type: String,
            default: '',
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
statApiErrorSchema.set('collection', 'stat_api_error');

var model = mongoose.model('StatApiError', statApiErrorSchema);

module.exports = model;
