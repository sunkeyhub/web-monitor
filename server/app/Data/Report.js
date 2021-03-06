/**
 * 上报数据Id映射
 *
 * @author : Sunkey 
 */

// 服务ID映射对象
exports.service = {
    1001: {
        name: 'js_meta',
        comment: 'js基础数据上报'
    },
    1002: {
        name: 'js_error',
        comment: 'js报错数据上报'
    }
}

// 渠道ID映射对象
exports.channel = {
    2001: {
        name: '手机迅雷'
    },
    2002: {
        name: '微信'
    },
    2003: {
        name: '浏览器'
    },
    2999: {
        name: '其他'
    }
};

// 页面ID映射对象
exports.page = [
    {
        id: 3001,
        name: '安卓搜索结果页',
        url: 'http://www.baidu.com',
    },
    {
        id: 3002,
        name: 'ios搜索结果页',
        url: 'http://www.google.com',
    },
    {
        id: 3003,
        name: '分享页',
        url: 'http://www.google.com',
    },
    {
        id: 3004,
        name: '安卓任务积分页',
        url: 'http://www.google.com',
    },
    {
        id: 3005,
        name: 'ios任务积分页',
        url: 'http://www.google.com',
    },
    {
        id: 3006,
        name: 'ios趣图',
        url: 'http://www.google.com',
    },
    {
        id: 3007,
        name: '安卓长视频',
        url: 'http://www.google.com',
    },
    {
        id: 3008,
        name: 'ios长视频',
        url: 'http://www.google.com',
    },
    {
        id: 3009,
        name: 'ios短视频',
        url: 'http://www.google.com',
    },
    {
        id: 3010,
        name: '安卓看单页',
        url: 'http://www.google.com',
    },
    {
        id: 3011,
        name: 'ios看单页',
        url: 'http://www.google.com',
    },
    {
        id: 3012,
        name: '安卓趣图',
        url: 'http://www.google.com',
    },
    {
        id: 3013,
        name: '安卓短视频',
        url: 'http://www.google.com',
    },
];
