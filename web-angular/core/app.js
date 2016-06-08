/**
 * 主应用模块
 *
 * @author : Sunkey
 */

define(['angular', 'app/routes', 'uiRouter'], (angular, routes) => {
	const app = angular.module('app', [
		'ui.router',
	]);
	
	app.asyncJs = (path) => {
		return ['$q', ($q) => {
			const defer = $q.defer();
			require([path], (loader) => {
				defer.resolve();
			});

			return defer.promise;
		}];
	}

	app.config(($stateProvider,
				$urlRouterProvider,
				$controllerProvider,
				$compileProvider,
				$filterProvider,
				$provide) => {
		app.register = {
			controller: $controllerProvider.register,
			directive: $compileProvider.directive,
			filter: $filterProvider.register,
			factory: $provide.factory,
			service: $provide.service,
		};

		routes($stateProvider, $urlRouterProvider, app);
	});

	return app;
});
