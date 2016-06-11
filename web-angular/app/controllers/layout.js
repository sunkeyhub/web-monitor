/**
 * 基础控制器
 *
 * @author : Sunkey
 */

define(['core/app'], (app) => {
    app.controller('controllers.layout', function($scope, $rootScope, $state) {
        $scope.currentState = $state.current.name;
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            $scope.currentState = toState.name;
        });

        $scope.minContentHeight = (window.innerHeight - 110) + 'px';
        $(window).on('resize', () => {
            $scope.$apply(() => {
                $scope.minContentHeight = (window.innerHeight - 110) + 'px';
            });
        });

        $state.current.name==='admin' && $state.go('admin.index');
    });
});
