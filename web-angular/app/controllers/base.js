/**
 * 基础控制器
 *
 * @author : Sunkey
 */

define(['core/app'], (app) => {
    app.register.controller('controllers.base', function($scope, $rootScope, $state) {
        $scope.currentState = $state.current.name;
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            $scope.currentState = toState.name;
        });
    });
});
