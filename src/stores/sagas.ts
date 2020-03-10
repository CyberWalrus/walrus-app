import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import app from './app/saga';

export default function* rootSaga(): SagaIterator {
  yield fork(app);
}
