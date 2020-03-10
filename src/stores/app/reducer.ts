import { ActionTypesSuccess } from './action-types';
import { AppActions } from './actions';

export type AppState = { test: string };

const initialState: AppState = {
  test: '',
};

export default (state: AppState = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case ActionTypesSuccess.SET_TEST_VALUE_SUCCESS: {
      return {
        ...state,
        test: action.payload,
      };
    }
    default:
      return state;
  }
};
