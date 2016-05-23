/**
 * 性能分析数据reducer
 *
 * @author : Sunkey
 */

var initialState = {
    factorKey: '-', 
    factorList: [],
    trend: {},
    period: {},
    performance: {},
};

export default function timing(state=initialState, action) {
    switch (action.type) {
        case 'INIT_FACTOR_LIST': {
            if (action.data.code == 200) {
                var factorList = action.data.data;
                if (factorList.length > 0) {
                    var factorKey = factorList[0].key;
                    return Object.assign({}, state, {factorKey: factorKey, factorList: factorList})
                }
            }
        }
        case 'UPDATE_TIMING_SECTION': {
            if (action.data.code == 200) {
                return Object.assign({}, state, action.data.data);
            }
        }
        case 'CHANGE_TIMING_SECTION': {
            return Object.assign({}, state, action.data);
        }
    }

    return state;
}
