/**
 * 路由入口
 *
 * @author : Sunkey
 */

define([], () => {
	return ($stateProvider, $urlRouterProvider, app) => {
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: 'app/views/index.html',
			controller: 'controllers.index',
			resolve: {
				load: app.asyncJs('app/controllers/index'),
			},
		});

		$stateProvider.state('index.configJson', {
			url: '/config_json',
			templateUrl: 'app/views/configJson.html',
			controller: 'controllers.configJson',
			resolve: {
				load: app.asyncJs('app/controllers/configJson'),
			},
		});

		$stateProvider.state('index.configTest', {
			url: '/config_test',
			templateUrl: 'app/views/configTest.html',
			controller: 'controllers.configTest',
			resolve: {
				load: app.asyncJs('app/controllers/configTest'),
			},
		});
	};
});
