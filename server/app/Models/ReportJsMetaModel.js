/**
 * 前端元数据上报数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportJsMetaSchema = new Schema({
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
    device: {
        family: {
            type: String,
            default: 'Other',
        },
        width: {
            type: Number,
            requred: true,
        },
        height: {
            type: Number,
            required: true,
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
    performance: {
        timing: {
            type: {},
            required: true,
        },
    },
    timing_human: {
        type: {},
        required: true,
    },
    created_time: {
        type: Date, 
        default: Date.now,
    },
});

// 设置集合名称
reportJsMetaSchema.set('collection', 'report_js_meta');

var model = mongoose.model('ReportJsMeta', reportJsMetaSchema);

module.exports = model;
