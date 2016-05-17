/**
 * 前端报错数据上报数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportJsErrorSchema = new Schema({
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
            default: '',
            required: true,
        },
        major: {
            type: String,
            default: '0',
        },
        minor: {
            type: String,
            default: '0',
        },
        patch: {
            type: String,
            default: '0',
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
        phase: {
            type: String,
            enum: ['2G', '3G', '4G', '5G', 'WIFI', 'Other'],
            default: 'Other',
        },
        isp: {
            type: String,
            default: 'Other',
        }
    },
    msg: {
        type: String,
        required: true,
    },
    file: {
        path: {
            type: String,
            default: '',
        },
        line: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        }
    },
    stack: {
        type: [],
        default: [],
    },
    created_time: {
        type: Date, 
        default: Date.now,
    }
});

// 设置集合名称
reportJsErrorSchema.set('collection', 'report_js_error');

var model = mongoose.model('ReportJsError', reportJsErrorSchema);

module.exports = model;
