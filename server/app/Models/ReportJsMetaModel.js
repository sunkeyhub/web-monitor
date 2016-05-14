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
    divice: {
        name: {
            type: String,
            default: '',
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
    page: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
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
