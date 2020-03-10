import { ActionTypes, ActionTypesSuccess } from './action-types';

export type CallSagaTest = { type: ActionTypes.SET_TEST_VALUE; payload: string };
export type SetTest = { type: ActionTypesSuccess.SET_TEST_VALUE_SUCCESS; payload: string };

export type AppActions = CallSagaTest & SetTest;

export const callSagaTest = (payload: string): CallSagaTest => ({
  type: ActionTypes.SET_TEST_VALUE,
  payload,
});

export const setTest = (payload: string): SetTest => ({
  type: ActionTypesSuccess.SET_TEST_VALUE_SUCCESS,
  payload,
});
