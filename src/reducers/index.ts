import { StoreState } from '../types';
import { SotahClientAction } from '../actions';
import { GET_REGIONS } from '../constants';

export const sotah = (state: StoreState, action: SotahClientAction): StoreState => {
  switch (action.type) {
    case GET_REGIONS:
      return state;
    default:
      return state;
  }
};
