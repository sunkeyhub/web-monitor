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
            dispatch({type: 'INIT_PAGE_LIST', data: json});
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
            page_id: pageId,
            start_date: startDate,
            end_date: endDate,
        };

        switch (state.routing.locationBeforeTransitions.pathname) {
            case '/stat/overview': {
                var pathname = 'admin/stat/overview';
                var actionType = 'UPDATE_OVERVIEW_SECTION';
                break;
            }
            case '/stat/timing':
                var queryObj = {
                    type: 'timing',
                };
                var pathname = 'admin/common/factorList';
                var actionType = 'INIT_FACTOR_LIST';
                break;
            case '/stat/jsError':
                var queryObj = {
                    type: 'jsError',
                };
                var pathname = 'admin/common/factorList';
                var actionType = 'INIT_FACTOR_LIST';
                break;
            case '/stat/apiError':
                var queryObj = {
                    type: 'apiError',
                };
                var pathname = 'admin/common/factorList';
                var actionType = 'INIT_FACTOR_LIST';
                break;
        }

        var requestUrl = url.format({
            protocol: 'http',
            hostname: server['hostname'],
            port: server['port'],
            pathname: pathname,
            query: queryObj,
        });

        return fetch(requestUrl).then(function(res) {
            return res.json();
        }).then(function(json) {
            dispatch({type: actionType, data: json});
        });
    };
}

export function getSubSectionData(factorKey) {
    return (dispatch, getState) => {
        var state = getState();
        var startDate = moment(state.stat.topbar.startDate).format('YYYY-MM-DD');
        var endDate = moment(state.stat.topbar.endDate).format('YYYY-MM-DD');

        var queryObj = {
            page_id: state.stat.topbar.pageId,
            start_date: startDate,
            end_date: endDate,
            factor: factorKey,
        }

        switch (state.routing.locationBeforeTransitions.pathname) {
            case '/stat/timing': {
                var pathname = 'admin/stat/timing';
                var actionType = 'UPDATE_TIMING_SECTION';
                break;
            }
            case '/stat/jsError': {
                var pathname = 'admin/stat/jsError';
                var actionType = 'UPDATE_JS_ERROR_SECTION';
                break;
            }
            case '/stat/apiError': {
                var pathname = 'admin/stat/apiError';
                var actionType = 'UPDATE_API_ERROR_SECTION';
                break;
            }
        }

        var requestUrl = url.format({
            protocol: 'http',
            hostname: server['hostname'],
            port: server['port'],
            pathname: pathname,
            query: queryObj,
        });

        return fetch(requestUrl).then(function(res) {
            return res.json();
        }).then(function(json) {
            dispatch({type: actionType, data: json});
        });
    };   
}

export function getJsErrorInfoList(p, per) {
    return (dispatch, getState) => {
        const state = getState();
        const startDate = moment(state.stat.topbar.startDate).format('YYYY-MM-DD');
        const endDate = moment(state.stat.topbar.endDate).format('YYYY-MM-DD');

        const queryObj = {
            page_id: state.stat.topbar.pageId,
            start_date: startDate,
            end_date: endDate,
        }    

        const pathname = 'admin/stat/getJsErrorInfoList';
        const requestUrl = url.format({
            protocol: 'http',
            hostname: server['hostname'],
            port: server['port'],
            pathname: pathname,
            query: queryObj,
        });

        return fetch(requestUrl).then(function(res) {
            return res.json();
        }).then(function(json) {
            dispatch({type: 'UPDATE_JS_ERROR_INFO_LIST', data: json});
        });       
    }
}

export function changeTimingSection(data) {
    return {
        type: 'CHANGE_TIMING_SECTION',
        data: data,
    };
}

export function changeJsErrorSection(data) {
    return {
        type: 'CHANGE_JS_ERROR_SECTION',
        data: data,
    }; 
}

export function changeApiErrorSection(data) {
    return {
        type: 'CHANGE_API_ERROR_SECTION',
        data: data,
    }; 
}

/**
 * 更改topbar
 * @return Promise
 */
export function changeTopbar(data) {
    return {
        type: 'CHANGE_TOPBAR',
        data: data,
    };
}
