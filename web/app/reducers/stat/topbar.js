/**
 * 导航栏reducer
 *
 * @author : Sunkey
 */

var moment = require('moment');

var initialState = {
    pageList: [],
    pageId: '-',
    startDate: moment().subtract(7, 'day').toDate(),
    endDate: moment().toDate(),
};

export default function topbar(state=initialState, action) {
    switch (action.type) {
        case 'INIT_PAGE_LIST': {
            var data = action.data;
            if (data.code == 200) {
                var pageList = data.data;
                if (pageList && pageList.length > 0) {
                    return Object.assign({}, state, {pageId: pageList[0].id, pageList: data.data});
                }
            }
        }
        case 'CHANGE_TOPBAR': {
            var data = action.data;
            return Object.assign({}, state, data);
        }
    }

    return state;
}
