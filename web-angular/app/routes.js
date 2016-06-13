/**
 * 路由入口
 *
 * @author : Sunkey
 */

define([], () => {
	return ($stateProvider, $urlRouterProvider, app) => {
		// 定义默认路由
		const defaultRoute = 'admin.index';
		$stateProvider.state('space', {
			url: '',
			controller: function($scope, $state) {
				$state.go(defaultRoute);
			},
		})
		.state('error', {
			url: '/error',
			templateUrl: 'app/views/error/layout.html',
		})
		.state('error.404', {
			url: '/404',
			templateUrl: 'app/views/error/404.html',
		});

		$urlRouterProvider.otherwise('/error/404');


		// 定义后台路由
		$stateProvider.state('admin', {
			url: '/admin',
			templateUrl: 'app/views/layout.html',
			controllerUrl: 'app/controllers/layout',
			controller: 'controllers.layout',
		})	    
		.state('admin.index', {
			url: '^/admin/index',
			templateUrl: 'app/views/index.html',
			controllerUrl: 'app/controllers/index',
			controller: 'controllers.index',
		})
		.state('admin.configJson', {
			url: '^/admin/config_json',
			templateUrl: 'app/views/configJson.html',
			controllerUrl: 'app/controllers/configJson',
			controller: 'controllers.configJson',
		})
		.state('admin.configTest', {
			url: '^/admin/config_test',
			templateUrl: 'app/views/configTest.html',
			controllerUrl: 'app/controllers/configTest',
			controller: 'controllers.configTest',
		});
	};
});
