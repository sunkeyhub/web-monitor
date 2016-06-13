/**
 * http服务拦截器
 *
 * @author : Sunkey
 */

define(['core/app', 'app/services/session'], (app) => {
    app.factory('service.httpInterceptor', [ 'services.session'
        function(sessionService) {
            return {
                request: (config) => {
                    if (!sessionService.isGuest()) {
                        config['x-session-token'] = sessionService.getToken();
                    }
                },
                response: (response) => {
                },
                responseError: (response) => {
                    if (response.status == 401) {
                        console.log('未登录');
                    }
                }
            };
        }
    ]);
});
