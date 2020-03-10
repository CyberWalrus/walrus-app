import { NameSpace } from '@constants/reducer';
import { AppActions } from '@stores/app/actions';
import { AppState } from '@stores/app/reducer';

export interface StateApp {
  [NameSpace.APP]: AppState;
}

export type ActionApp = AppActions;
