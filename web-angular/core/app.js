/**
 * 主应用模块
 *
 * @author : Sunkey
 */

define(['angular', 'app/routes', 'angular-async-loader', 'angular-ui-router'],
	(angular, routes, asyncLoader) => {
		const app = angular.module('app', [
			'ui.router',
		]);

		asyncLoader.configure(app);

		app.config(($stateProvider,
					$urlRouterProvider,
					$locationProvider,
					$httpProvider) => {
			$locationProvider.html5Mode({
				enabled: false,
			});

			$httpProvider.defaults.headers.common = {
				'content-type': 'application/json;charset=utf-8',
			};

			routes($stateProvider, $urlRouterProvider, app);
		});

		return app;
	}
);
