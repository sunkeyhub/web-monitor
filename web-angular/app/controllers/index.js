/**
 * 首页控制器
 *
 * @author : Sunkey
 */

define(['core/app'], (app) => {
	app.register.controller('controllers.index', function($scope) {
		$scope.currentHash = location.hash;

		$scope.changeMenu = () => {
			$scope.currentHash = location.hash;
		};
	});
});
