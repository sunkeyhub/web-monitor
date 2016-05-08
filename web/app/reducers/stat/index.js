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
import err from './err';

export default combineReducers({
    topbar,
    sidebar,
    overview,
    timing,
    err,
});
