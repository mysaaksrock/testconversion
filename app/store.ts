'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middleware: any[] = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

const fns: any[] = [
  applyMiddleware(...middleware),
];

const willAddReduxDevTools: boolean =
  process.env.NODE_ENV === 'development' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION__;

if (willAddReduxDevTools) {
  fns.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, compose(...fns));