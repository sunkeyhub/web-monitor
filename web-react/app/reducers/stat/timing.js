/**
 * 性能分析数据reducer
 *
 * @author : Sunkey
 */

import * as ACTION_TYPE from '../../constants/ACTION_TYPE';

var initialState = {
    factorKey: '-', 
    factorList: [],
    trend: {},
    period: {},
    performance: {},
};

export default function timing(state=initialState, action) {
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
        case ACTION_TYPE.UPDATE_TIMING_SECTION: {
            if (action.data.code == 200) {
                return Object.assign({}, state, action.data.data);
            }
        }
        case ACTION_TYPE.CHANGE_TIMING_SECTION: {
            return Object.assign({}, state, action.data);
        }
    }

    return state;
}
