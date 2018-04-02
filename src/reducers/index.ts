import { StoreState, AppLevel, Regions, Realms } from '../types';
import { SotahClientAction } from '../actions';
import {
  RECEIVE_REGIONS,
  REQUEST_PING,
  RECEIVE_PING,
  REQUEST_REGIONS,
  REGION_CHANGE,
  REQUEST_REALMS,
  RECEIVE_REALMS
} from '../constants';

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

      const currentRegion = action.data[0];
      const regions: Regions = action.data.reduce(
        (result, region) => { return { ...result, [region.name]: region }; },
        {}
      );

      return { ...state, appLevel: AppLevel.fetchRegionSuccess, regions, currentRegion };
    case REGION_CHANGE:
      return { ...state, currentRegion: action.region };
    case REQUEST_REALMS:
      return { ...state, fetchingRealms: true };
    case RECEIVE_REALMS:
      const realms: Realms = action.data.reduce(
        (result, realm) => { return { ...result, [realm.slug]: realm }; },
        {}
      );
      return { ...state, fetchingRealms: false, realms };
    default:
      return state;
  }
};
