// @flow
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createExpirationTransform from 'redux-persist-transform-expire';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { ActionApp, StateApp } from '@custom-types/store';

import { ActionTypes } from './app/action-types';
import reducer from './reducers';
import rootSagas from './sagas';

export const expireTransform = createExpirationTransform({
  expireKey: 'persistExpiresAt', // default
  defaultState: {}, // default
});
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  // IMPORTANT!! remember to process actionTypes.global.SET_PERSIST_EXPIRE_TIMEOUT
  // in each branch added here!!
  transforms: [expireTransform],
};

const tokenPersistConfig = {
  key: 'app',
  storage,
  blacklist: [],
  transforms: [expireTransform],
};

const reducers = {
  ...reducer,
  token: persistReducer(tokenPersistConfig, reducer.app),
};

const persistedReducer = persistReducer(rootPersistConfig, combineReducers(reducers));
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): { store: Store<StateApp, ActionApp>; persist: any } => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore<StateApp, ActionApp, any, any>(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSagas);
  const persist = persistStore(store);
  return { store, persist };
};
