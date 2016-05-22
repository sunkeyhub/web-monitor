/**
 * 导航栏reducer
 *
 * @author : Sunkey
 */

var moment = require('moment');

var initialState = {
    pageList: [],
    startDate: moment().subtract(7, 'day').toDate(),
    endDate: moment().toDate(),
    isInit: false,
};

export default function topbar(state=initialState, action) {
    switch (action.type) {
        case 'UPDATE_PAGE_LIST': {
            var data = action.data;
            if (data.code == 200) {
                return Object.assign({}, state, {isInit: true, pageList: data.data});
            }
        }
        case 'CHANGE_DATE': {

        }
    }

    return state;
}
