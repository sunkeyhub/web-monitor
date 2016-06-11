/**
 * 导航栏reducer
 *
 * @author : Sunkey
 */

import * as ACTION_TYPE from '../../constants/ACTION_TYPE';

var moment = require('moment');

var initialState = {
    pageList: [],
    pageId: '-',
    startDate: moment().subtract(7, 'day').toDate(),
    endDate: moment().toDate(),
};

export default function topbar(state=initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.INIT_PAGE_LIST: {
            var data = action.data;
            if (data.code == 200) {
                var pageList = data.data;
                if (pageList && pageList.length > 0) {
                    return Object.assign({}, state, {pageId: pageList[0].id, pageList: data.data});
                }
            }
        }
        case ACTION_TYPE.CHANGE_TOPBAR: {
            var data = action.data;
            return Object.assign({}, state, data);
        }
    }

    return state;
}
