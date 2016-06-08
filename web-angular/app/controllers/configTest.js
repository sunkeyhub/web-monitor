/**
 * 首页控制器
 *
 * @author : Sunkey
 */

define(['core/app'], (app) => {
	app.register.controller('controllers.configTest', function($scope) {
		$scope.test = 'test';

        console.log('test');
	});
});