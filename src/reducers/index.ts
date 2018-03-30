import { StoreState } from '../types';
import { SotahClientAction } from '../actions';
import { REQUEST_REGIONS } from '../constants';

type State = Readonly<StoreState>;

export const sotah = (state: State, action: SotahClientAction): State => {
  switch (action.type) {
    case REQUEST_REGIONS:
      return state;
    default:
      return state;
  }
};
