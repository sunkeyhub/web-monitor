/**
 * reducer入口
 *
 * @author : Sunkey
 */

import { combineReducers } from 'redux';

import stat from './stat/';

var pageReducer = combineReducers({
    stat,
});

export default pageReducer;