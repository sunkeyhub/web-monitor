/**
 * 路由入口
 *
 * @author : Sunkey
 */

define([], () => {
	return ($stateProvider, $urlRouterProvider, app) => {
		$urlRouterProvider.otherwise('/admin/index');
		$stateProvider.state('admin', {
			url: '/admin',
			templateUrl: 'app/views/base.html',
			controller: 'controllers.base',
			resolve: {
				load: app.asyncJs('app/controllers/base'),
			},
		});

		$stateProvider.state('admin.index', {
			url: '/index',
			templateUrl: 'app/views/index.html',
			controller: 'controllers.index',
			resolve: {
				load: app.asyncJs('app/controllers/index'),
			},
		});

		$stateProvider.state('admin.configJson', {
			url: '/config_json',
			templateUrl: 'app/views/configJson.html',
			controller: 'controllers.configJson',
			resolve: {
				load: app.asyncJs('app/controllers/configJson'),
			},
		});

		$stateProvider.state('admin.configTest', {
			url: '/config_test',
			templateUrl: 'app/views/configTest.html',
			controller: 'controllers.configTest',
			resolve: {
				load: app.asyncJs('app/controllers/configTest'),
			},
		});
	};
});
