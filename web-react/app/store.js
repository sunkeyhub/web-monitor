import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

export default function configureStore(history) {
    var reducerObj = Object.assign({}, {routing: routerReducer}, reducers);

    const state = combineReducers(reducerObj);

    const middlewares = [
        thunkMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        state,
        compose(
            applyMiddleware(...middlewares)
        )
    );

    return store;
}

