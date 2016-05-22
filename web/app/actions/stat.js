/**
 * stat 页面的 actions
 *
 * @author: Sunkey
 */

import fetch from 'isomorphic-fetch';
import url from 'url';
var moment = require('moment');

import server from '../../config/server';

/**
 * 获取页面列表
 * @return Promise
 */
export function getPageList() {
    return (dispatch, getState) => {
        var requestUrl = url.format({
            hostname: server['hostname'],
            port: server['port'],
            pathname: 'admin/common/pageList',
        });
        return fetch(requestUrl).then(function(res) {
            return res.json();
        }).then(function(json) {
            dispatch({type: 'UPDATE_PAGE_LIST', data: json});
        });
    };
}

/**
 * 获取页面数据
 * @param  int pageId    页面ID
 * @param  Date startDate 开始日期
 * @param  Date endDate   结束日期
 * @return Promise
 */
export function getSectionData(pageId, startDate, endDate) {
    return (dispatch, getState) => {
        var state = getState();
        startDate = moment(startDate).format('YYYY-MM-DD');
        endDate = moment(endDate).format('YYYY-MM-DD');
        var queryObj = {
            protocol: 'http',
            page_id: pageId,
            start_date: startDate,
            end_date: endDate,
        };

        switch (state.routing.locationBeforeTransitions.pathname) {
            case '/stat/overview': {
                var pathname = 'admin/stat/overview';
                var actionType = 'UPDATE_OVERVIEW_DATA';
                break;
            }
            case '/stat/timing': {

            }
            case '/stat/jsError': {

            }
            case '/stat/apiError': {

            }
        }

        var requestUrl = url.format({
            protocol: 'http',
            hostname: server['hostname'],
            port: server['port'],
            pathname: pathname,
            query: queryObj,
        });

        console.log(requestUrl);

        return fetch(requestUrl).then(function(res) {
            return res.json();
        }).then(function(json) {
            dispatch({type: actionType, data: json});
        });
    };
}
