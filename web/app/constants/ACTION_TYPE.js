/**
 * action类型常量
 * 
 * @author : Sunkey
 */

// 初始化页面列表
export const INIT_PAGE_LIST = Symbol('INIT_PAGE_LIST');

// 更新概览数据页面
export const UPDATE_OVERVIEW_SECTION = Symbol('UPDATE_OVERVIEW_SECTION');

// 初始化分析因子列表
export const INIT_FACTOR_LIST = Symbol('INIT_FACTOR_LIST');

// 更新性能分析页面
export const UPDATE_TIMING_SECTION = Symbol('UPDATE_TIMING_SECTION');

// 更新 Js 报错分析页面
export const UPDATE_JS_ERROR_SECTION = Symbol('UPDATE_JS_ERROR_SECTION');

// 更新 Api 报错页面
export const UPDATE_API_ERROR_SECTION = Symbol('UPDATE_API_ERROR_SECTION');

// 更新 Js 报错详情列表
export const UPDATE_JS_ERROR_INFO_LIST = Symbol('UPDATE_JS_ERROR_INFO_LIST');

// 更新 Api 报错详情列表
export const UPDATE_API_ERROR_INFO_LIST = Symbol('UPDATE_API_ERROR_INFO_LIST');

// 改变性能分析因子
export const CHANGE_TIMING_SECTION = Symbol('CHANGE_TIMING_SECTION');

// 改变 Js 报错分析因子
export const CHANGE_JS_ERROR_SECTION = Symbol('CHANGE_JS_ERROR_SECTION');

// 改变 Api 报错分析因子
export const CHANGE_API_ERROR_SECTION = Symbol('CHANGE_API_ERROR_SECTION');

// 改变topbar
export const CHANGE_TOPBAR = Symbol('CHANGE_TOPBAR');
