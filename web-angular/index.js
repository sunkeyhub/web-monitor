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
		uiRouter: 'node_modules/angular-ui-router/release/angular-ui-router',
		jquery: 'node_modules/jquery/dist/jquery.min',
		underscore: 'node_modules/underscore/underscore-min',
		bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
	},
	shim: {
		angular: {
			exports: 'angular',
		},
		uiRouter: {
			deps: ['angular'],
			exports: 'uiRouter',
		},
	},
};

require.config(config);

require(['angular', 'core/app', 'jquery', 'underscore'], function(angular) {
	angular.bootstrap($('#root')[0], ['app']);
});