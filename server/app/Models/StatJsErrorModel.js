/**
 * 统计Js报错数据模型
 *
 * @author : Sunkey
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statJsErrorSchema = new Schema({
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
