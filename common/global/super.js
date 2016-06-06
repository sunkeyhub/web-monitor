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

// 是否是生成器判断
_.isGenerator = function(obj) {
	return obj && obj.prototype && obj.prototype.toString() === '[object Generator]' ? true : false;
}

// 是否是某构造器的实例
_.isInstance = function(obj, constructor) {
	return obj instanceof constructor ? true : false;
}

global.moment = require('moment');
