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
                comment: '总览数据路由',
                method: 'GET',
                path: '/stat/overview',
                route: 'StatController@overview',
            },
            {
                comment: '性能数据路由',
                method: 'GET',
                path: '/stat/overview',
                route: 'StatController@timing',
            },
            {
                comment: '报错数据路由',
                method: 'GET',
                path: '/stat/err',
                route: 'StatController@err',
            }
        ],
    },
];
