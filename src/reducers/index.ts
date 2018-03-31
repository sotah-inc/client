import { StoreState, AppLevel } from '../types';
import { SotahClientAction } from '../actions';
import { RECEIVE_REGIONS, REQUEST_PING, RECEIVE_PING } from '../constants';

type State = Readonly<StoreState>;

export const sotah = (state: State, action: SotahClientAction): State => {
  switch (action.type) {
    case REQUEST_PING:
      return { ...state, appLevel: AppLevel.connecting };
    case RECEIVE_PING:
      if (!action.data) {
        return { ...state, appLevel: AppLevel.connectFailure };
      }
      return { ...state, appLevel: AppLevel.connectSuccess };
    case RECEIVE_REGIONS:
      return { ...state, regions: action.data };
    default:
      return state;
  }
};
