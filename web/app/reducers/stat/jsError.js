/**
 * Js 报错分析数据 reducer
 *
 * @author : Sunkey
 */

var initialState = {
    factorKey: '-', 
    factorList: [],
    trend: {},
    infoList: [],
};

export default function jsError(state=initialState, action) {
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
        case 'UPDATE_JS_ERROR_SECTION': {
            if (action.data.code == 200) {
                return Object.assign({}, state, action.data.data);
            }
        }
        case 'CHANGE_JS_ERROR_SECTION': {
            return Object.assign({}, state, action.data);
        }
        case 'UPDATE_JS_ERROR_INFO_LIST': {
            return Object.assign({}, state, {infoList: action.data.data});
        }
    }

    return state;
}
