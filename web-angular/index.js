/**
 * requirejs 配置文件
 *
 * @author : Sunkey
 */

let ver = Date.now();

const config = {
	baseUrl: "./",
	urlArgs: '_v=' + ver,
	paths: {
		angular: 'node_modules/angular/angular.min',
		'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router',
		'angular-async-loader': 'node_modules/angular-async-loader/angular-async-loader.min',
		jquery: 'node_modules/jquery/dist/jquery.min',
		underscore: 'node_modules/underscore/underscore-min',
		bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
	},
	shim: {
		angular: {
			exports: 'angular',
		},
		'angular-ui-router': {
			deps: ['angular'],
			exports: 'angular-ui-router',
		},
	},
};

require.config(config);

require(['angular', 'core/app', 'jquery', 'underscore'], function(angular) {
	angular.bootstrap($('#root')[0], ['app']);
});