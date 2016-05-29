/**
 * Api 报错分析数据 reducer
 *
 * @author : Sunkey
 */

var initialState = {
    factorKey: '-', 
    factorList: [],
    trend: {},
};

export default function apiError(state=initialState, action) {
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
        case 'UPDATE_API_ERROR_SECTION': {
            if (action.data.code == 200) {
                return Object.assign({}, state, action.data.data);
            }
        }
        case 'CHANGE_API_ERROR_SECTION': {
            return Object.assign({}, state, action.data);
        }
    }

    return state;
}