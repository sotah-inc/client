import {
  MainState,
  FetchPingLevel,
  FetchRegionLevel,
  FetchRealmLevel,
  AuthLevel,
  defaultMainState
} from '@app/types/main';
import { Regions, Realms } from '@app/types/global';
import {
  MainActions,
  REQUEST_PING, RECEIVE_PING,
  USER_REGISTER, USER_LOGIN, RECEIVE_USER_RELOAD,
  REQUEST_REGIONS, RECEIVE_REGIONS,
  REGION_CHANGE,
  REQUEST_REALMS, RECEIVE_REALMS,
  REALM_CHANGE
} from '@app/actions/main';

type State = Readonly<MainState> | undefined;

export const main = (state: State, action: MainActions): State => {
  if (state === undefined) {
    return defaultMainState;
  }

  switch (action.type) {
    case REQUEST_PING:
      return { ...state, fetchPingLevel: FetchPingLevel.fetching };
    case RECEIVE_PING:
      if (action.payload === false) {
        return { ...state, fetchPingLevel: FetchPingLevel.failure };
      }

      return { ...state, fetchPingLevel: FetchPingLevel.success };
    case USER_REGISTER:
      return { ...state, profile: action.payload, isRegistered: true, authLevel: AuthLevel.authenticated };
    case USER_LOGIN:
      return { ...state, profile: action.payload, isLoggedIn: true, authLevel: AuthLevel.authenticated };
    case RECEIVE_USER_RELOAD:
      if (action.payload.error !== null) {
        return { ...state, authLevel: AuthLevel.unauthenticated };
      }

      return { ...state, profile: { user: action.payload.user!, token: state.preloadedToken } };
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
