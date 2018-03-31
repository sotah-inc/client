import { StoreState, AppLevel } from '../types';
import { SotahClientAction } from '../actions';
import { REQUEST_REGIONS, REQUEST_PING, RECEIVE_PING } from '../constants';

type State = Readonly<StoreState>;

export const sotah = (state: State, action: SotahClientAction): State => {
  switch (action.type) {
    case REQUEST_PING:
      return {...state, appLevel: AppLevel.connecting};
    case RECEIVE_PING:
      return {...state, appLevel: AppLevel.connectFailure};
    case REQUEST_REGIONS:
      return state;
    default:
      return state;
  }
};
