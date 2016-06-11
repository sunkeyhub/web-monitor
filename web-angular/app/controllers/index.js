/**
 * 首页控制器
 *
 * @author : Sunkey
 */

define(['core/app', 'app/services/session'], (app) => {
	app.controller('controllers.index', ['$scope', 'service.session',
        function($scope, sessionService) {
          $scope.index = 'index';
          console.log(sessionService.service);
	   }
    ]);
});
