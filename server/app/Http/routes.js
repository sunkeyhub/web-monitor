/**
 * 路由配置文件
 *
 * @author : Sunkey
 */

module.exports = [
    {
        comment: '前端路由组',
        name: 'Api',
        path: '/api',
        list: [
            {
                comment: '前端上报路由',
                method: 'GET',
                path: '/report',
                route: 'ReportController@index',
            }
        ],
    },
    {
        comment: '后台管理路由组',
        name: 'Admin',
        path: '/admin',
        list: [
            {
                comment: '总览数据接口',
                method: 'GET',
                path: '/stat/overview',
                route: 'StatController@overview',
            },
            {
                comment: '性能数据接口',
                method: 'GET',
                path: '/stat/timing',
                route: 'StatController@timing',
            },
            {
                comment: 'Js报错数据接口',
                method: 'GET',
                path: '/stat/jsError',
                route: 'StatController@jsError',
            },
            {
                comment: 'Api报错数据接口',
                method: 'GET',
                path: '/stat/apiError',
                route: 'StatController@apiError',
            },
            {
                comment: '页面列表接口',
                method: 'GET',
                path: '/common/pageList',
                route: 'CommonController@pageList',
            },
        ],
    },
];
