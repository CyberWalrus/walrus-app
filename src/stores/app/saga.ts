// @flow
import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { ActionTypes } from './action-types';
import { CallSagaTest, setTest } from './actions';

function* test(action: CallSagaTest): SagaIterator {
  try {
    yield put(setTest(action.payload));
  } catch (e) {
    yield put(setTest('fail'));
  }
}

export default function* listener(): SagaIterator {
  yield takeEvery(ActionTypes.SET_TEST_VALUE, test);
}
