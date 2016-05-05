import { combineReducers } from 'redux';

var initialState = {};

function topbar(state=initialState, action) {
    return state;
}

function sidebar(state=initialState, action) {
    return state;
}

function general(state=initialState, action) {
    return state;
}

var indexReducer = combineReducers({
    topbar,
    sidebar,
    general
});

export default indexReducer;