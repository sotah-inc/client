import { StoreState, FetchPingLevel, FetchRegionLevel, Regions, FetchRealmLevel, Realms } from '../types';
import {
  Actions,
  RECEIVE_REGIONS,
  REQUEST_PING,
  RECEIVE_PING,
  REQUEST_REGIONS,
  REGION_CHANGE,
  REQUEST_REALMS,
  RECEIVE_REALMS,
  REALM_CHANGE
} from '../actions';

type State = Readonly<StoreState>;

export const sotah = (state: State, action: Actions): State => {
  switch (action.type) {
    case REQUEST_PING:
      return { ...state, fetchPingLevel: FetchPingLevel.fetching };
    case RECEIVE_PING:
      if (action.payload === false) {
        return { ...state, fetchPingLevel: FetchPingLevel.failure };
      }
      return { ...state, fetchPingLevel: FetchPingLevel.success };
    case REQUEST_REGIONS:
      return { ...state, fetchRegionLevel: FetchRegionLevel.fetching };
    case RECEIVE_REGIONS:
      if (action.payload === null) {
        return { ...state, fetchRegionLevel: FetchRegionLevel.failure };
      }

      const currentRegion = action.payload[0];
      const regions: Regions = action.payload.reduce(
        (result, region) => { return { ...result, [region.name]: region }; },
        {}
      );

      return { ...state, fetchRegionLevel: FetchRegionLevel.success, regions, currentRegion };
    case REGION_CHANGE:
      return { ...state, currentRegion: action.payload };
    case REQUEST_REALMS:
      return { ...state, fetchRealmLevel: FetchRealmLevel.fetching };
    case RECEIVE_REALMS:
      if (action.payload === null) {
        return { ...state, fetchRealmLevel: FetchRealmLevel.failure };
      }

      const currentRealm = action.payload[0];
      const realms: Realms = action.payload.reduce(
        (result, realm) => { return { ...result, [realm.slug]: realm }; },
        {}
      );

      return { ...state, fetchRealmLevel: FetchRealmLevel.success, realms, currentRealm };
    case REALM_CHANGE:
      return { ...state, currentRealm: action.payload };
    default:
      return state;
  }
};
