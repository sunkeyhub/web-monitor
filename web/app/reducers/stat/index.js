/**
 * 统计页面reducer
 *
 * @author : Sunkey
 */

import { combineReducers } from 'redux';

import topbar from './topbar';
import sidebar from './sidebar';
import overview from './overview';
import timing from './timing';
import jsError from './jsError';
import apiError from './apiError';

export default combineReducers({
    topbar,
    sidebar,
    overview,
    timing,
    jsError,
    apiError,
});
