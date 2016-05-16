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
    os: {
        family: [{
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            timing: {
                performance: {
                    type: {},
                    required: true,
                },
                period: {
                    type: {},
                    required: true,
                },
                human: {
                    type: {},   
                    required: true,
                },
            }
        }],
    },
    browser: {
        family: [{
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            timing: {
                performance: {
                    type: {},
                    required: true,
                },
                period: {
                    type: {},
                    required: true,
                },
                human: {
                    type: {},   
                    required: true,
                },
            }
        }],
        family_major: [{
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            timing: {
                performance: {
                    type: {},
                    required: true,
                },
                period: {
                    type: {},
                    required: true,
                },
                human: {
                    type: {},   
                    required: true,
                },
            }
        }],
    },
    channel: [{
        id: {
            type: Number,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        timing: {
            performance: {
                type: {},
                required: true,
            },
            period: {
                type: {},
                required: true,
            },
            human: {
                type: {},   
                required: true,
            },
        }
    }],
    network: {
        phase: [{
            name: {
                type: Number,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            timing: {
                performance: {
                    type: {},
                    required: true,
                },
                period: {
                    type: {},
                    required: true,
                },
                human: {
                    type: {},   
                    required: true,
                },
            }
        }],
        isp: [{
            name: {
                type: Number,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            timing: {
                performance: {
                    type: {},
                    required: true,
                },
                period: {
                    type: {},
                    required: true,
                },
                human: {
                    type: {},   
                    required: true,
                },
            }
        }],
    },
    timing: {
        performance: {
            type: {},
            required: true,
        },
        period: {
            type: {},
            required: true, 
        },
        human: {
            type: {},
            required: true,
        },
    },
    timing_human: {
        type: {},
        required: true,
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
statJsMetaSchema.set('collection', 'stat_js_meta');

var model = mongoose.model('StatJsMeta', statJsMetaSchema);

module.exports = model;
