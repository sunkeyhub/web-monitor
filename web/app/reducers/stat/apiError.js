/**
 * Api 报错分析数据 reducer
 *
 * @author : Sunkey
 */

import * as ACTION_TYPE from '../../constants/ACTION_TYPE';

var initialState = {
    factorKey: '-', 
    factorList: [],
    trend: {},
    infoList: [],
};

export default function apiError(state=initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.INIT_FACTOR_LIST: {
            if (action.data.code == 200) {
                var factorList = action.data.data;
                if (factorList.length > 0) {
                    var factorKey = factorList[0].key;
                    return Object.assign({}, state, {factorKey: factorKey, factorList: factorList})
                }
            }
        }
        case ACTION_TYPE.UPDATE_API_ERROR_SECTION: {
            if (action.data.code == 200) {
                return Object.assign({}, state, action.data.data);
            }
        }
        case ACTION_TYPE.CHANGE_API_ERROR_SECTION: {
            return Object.assign({}, state, action.data);
        }
        case ACTION_TYPE.UPDATE_API_ERROR_INFO_LIST: {
            return Object.assign({}, state, {infoList: action.data.data});
        }
    }

    return state;
}