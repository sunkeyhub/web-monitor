/**
 * reducer入口
 *
 * @author : Sunkey
 */

import { combineReducers } from 'redux';

import stat from './index/';

var pageReducer = combineReducers({
    stat,
});

export default pageReducer;