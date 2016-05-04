import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import test from './reducers/index';

export default function configureStore(history) {
    const reducer = combineReducers({
        test,
        routing: routerReducer
    });

    const middlewares = [
        thunkMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        reducer,
        compose(
            applyMiddleware(...middlewares)
        )
    );

    return store;
}

