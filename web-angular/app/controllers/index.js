/**
 * 首页控制器
 *
 * @author : Sunkey
 */

define(['core/app'], (app) => {
	app.register.controller('controllers.index', function($scope, $rootScope, $state) {
        $scope.index = 'index';

        console.log('index');
	});
});
