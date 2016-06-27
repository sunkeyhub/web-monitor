/**
 * 公用超全局变量
 *
 * @author : Sunkey
 */
 
// 宿主环境绑定
global || (global = window);

// lodash 可全局访问 
global._ = require('lodash');

// 对象字段命名小驼峰=>下划线
_.camel2under = function(obj) {
	var underObj = _.isArray(obj) ? [] : {};

	_.forOwn(obj, function(val, key) {
		var newKey = _.kebabCase(key).replace('-', '_');
		var newVal = val;
		if (_.isObject(val)) {
			newVal = _.camel2under(val);
		}
		underObj[newKey] = newVal;
	});

	return underObj;
}

// 对象字段命名下划线=>小驼峰
_.under2camel = function(obj) {
	var camelObj = _.isArray(obj) ? [] : {};

	_.forOwn(obj, function(val, key) {
		var newKey = _.camelCase(key);
		var newVal = val;
		if (_.isObject(val)) {
			newVal = _.under2camel(val);
		}
		camelObj[newKey] = newVal;
	});

	return camelObj;
}

_.base64Encode = function(str) {
	var buffer = new Buffer(str);
	return buffer.toString('base64');
}

_.base64Decode = function(base64Str) {
	var buffer = new Buffer(base64Str, 'base64');
	return buffer.toString();
}

global.moment = require('moment');
