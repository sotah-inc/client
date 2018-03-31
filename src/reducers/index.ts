import { StoreState, AppLevel, Regions } from '../types';
import { SotahClientAction } from '../actions';
import { RECEIVE_REGIONS, REQUEST_PING, RECEIVE_PING, REQUEST_REGIONS } from '../constants';

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
    case REQUEST_REGIONS:
      return { ...state, appLevel: AppLevel.fetchingRegions };
    case RECEIVE_REGIONS:
      if (action.data === null) {
        return { ...state, appLevel: AppLevel.fetchRegionFailure };
      }

      const regions: Regions = action.data.reduce(
        (result, region) => { return {...result, [region.name]: region}; },
        {}
      );

      return { ...state, appLevel: AppLevel.fetchRegionSuccess, regions: regions };
    default:
      return state;
  }
};
