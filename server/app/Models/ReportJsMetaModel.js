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
    user_agent: {
        type: String,
        required: true,
    },
    os: {
        family: {
            type: String,
            default: '',
            required: true,
        },
        version: {
            type: String,
            default: '',
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
    browser: {
        family: {
            type: String,
            default: '',
            required: true,
        },
        version: {
            type: String,
            default: '',
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
    channel: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        version: {
            type: String,
            default: '',
        },
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
    performance: {
        timing: {
            type: {},
            required: true,
        }
    },
    timing_human: {
        type: {},
        required: true,
    },
    created_time: {
        type: Date, 
        default: Date.now,
    }
});

// 设置集合名称
reportJsMetaSchema.set('collection', 'report_js_meta');

var model = mongoose.model('ReportJsMeta', reportJsMetaSchema);

module.exports = model;
