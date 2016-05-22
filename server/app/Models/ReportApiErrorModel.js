/**
 * 前端接口报错上报数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportApiErrorSchema = new Schema({
    sid: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    page_id: {
        type: Number,
        required: true,
    },
    channel_id: {
        type: Number,
        required: true,
    },
    channel_version: {
        type: String,
        default: '',
    },
    user_agent: {
        type: String,
        required: true,
    },
    os: {
        family: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            default: '',
        },
        minor: {
            type: String,
            default: '',
        },
        patch: {
            type: String,
            default: '',
        },
    },
    browser: {
        family: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            default: '',
        },
        minor: {
            type: String,
            default: '',
        },
        patch: {
            type: String,
            default: '',
        },        
    },
    divice: {
        family: {
            type: String,
            default: 'Other',
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
    },
    ip: {
        type: String,
        required: true,
    },
    network: {
        isp: {
            type: String,
            default: 'Other',
        },
        phase: {
            type: String,
            enum: ['2G', '3G', '4G', '5G', 'WIFI', 'Other'],
            default: 'Other',
        },
    },
    msg: {
        type: String,
        default: '',
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
    created_time: {
        type: Date, 
        default: Date.now,
    }
});

// 设置集合名称
reportApiErrorSchema.set('collection', 'report_api_error');

var model = mongoose.model('ReportApiError', reportApiErrorSchema);

module.exports = model;
