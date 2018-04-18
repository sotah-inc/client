import {
  Regions,
  Realms
} from '@app/types/global';
import {
  AuctionState,
  FetchAuctionsLevel,
  FetchRegionLevel,
  FetchRealmLevel,
  defaultAuctionState
} from '@app/types/auction';
import {
  AuctionActions,
  REQUEST_REGIONS, RECEIVE_REGIONS,
  REGION_CHANGE,
  REQUEST_REALMS, RECEIVE_REALMS,
  REALM_CHANGE,
  REQUEST_AUCTIONS, RECEIVE_AUCTIONS
} from '@app/actions/auction';

type State = Readonly<AuctionState> | undefined;

export const auction = (state: State, action: AuctionActions): State => {
  if (state === undefined) {
    return defaultAuctionState;
  }

  switch (action.type) {
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
    case REQUEST_AUCTIONS:
      return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.fetching };
    case RECEIVE_AUCTIONS:
      if (action.payload === null) {
        return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.failure };
      }

      return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.success, auctions: action.payload };
    default:
      return state;
  }
};
