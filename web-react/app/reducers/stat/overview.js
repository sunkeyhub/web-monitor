/**
 * 总览数据reducer
 *
 * @author : Sunkey
 */

import * as ACTION_TYPE from '../../constants/ACTION_TYPE';

var initialState = {
    visit: {
        pv: 0,
        uv: 0,
        timing: 0,
        js_error: 0,
        api_error: 0,
    },
    timing: {
    },
    jsError: {
    },
    apiError: {
    },
};

export default function overview(state=initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_OVERVIEW_SECTION: {
            var data = action.data;
            if (data.code == 200) {
                var resData = data.data;
                var stateData = {
                    visit: {
                        pv: resData.visit.pv,
                        uv: resData.visit.uv,
                        timing: resData.visit.timing,
                        jsError: resData.visit.js_error,
                        apiError: resData.visit.api_error,
                    },
                    timing: resData.timing,
                    jsError: resData.js_error,
                    apiError: resData.api_error,
                }
                return Object.assign({}, state, stateData);
            }
        }
    };

    return state;
}
