import {
  Regions,
  Realms,
  Auction
} from '@app/types/global';
import {
  AuctionState,
  FetchAuctionsLevel,
  FetchRegionLevel,
  FetchRealmLevel,
  QueryAuctionsLevel,
  defaultAuctionState
} from '@app/types/auction';
import {
  AuctionActions,
  REQUEST_REGIONS, RECEIVE_REGIONS,
  REGION_CHANGE,
  REQUEST_REALMS, RECEIVE_REALMS,
  REALM_CHANGE,
  REQUEST_AUCTIONS, RECEIVE_AUCTIONS,
  PAGE_CHANGE, COUNT_CHANGE, SORT_CHANGE,
  REQUEST_AUCTIONS_QUERY, RECEIVE_AUCTIONS_QUERY
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
      return { ...state, currentRegion: action.payload, currentPage: defaultAuctionState.currentPage };
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
      return { ...state, currentRealm: action.payload, currentPage: defaultAuctionState.currentPage };
    case REQUEST_AUCTIONS:
      const fetchAuctionsLevel = state.fetchAuctionsLevel === FetchAuctionsLevel.initial
        ? FetchAuctionsLevel.fetching
        : FetchAuctionsLevel.refetching;
      return { ...state, fetchAuctionsLevel };
    case RECEIVE_AUCTIONS:
      if (action.payload === null) {
        return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.failure };
      }

      let auctions: Auction[] = [];
      if (action.payload.auctions !== null) {
        auctions = action.payload.auctions;
      }

      return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.success, totalResults: action.payload.total, auctions };
    case PAGE_CHANGE:
      return { ...state, currentPage: action.payload };
    case COUNT_CHANGE:
      return { ...state, auctionsPerPage: action.payload, currentPage: defaultAuctionState.currentPage };
    case SORT_CHANGE:
      const { sortDirection, sortKind } = action.payload;
      return { ...state, currentPage: defaultAuctionState.currentPage, sortDirection, sortKind };
    case REQUEST_AUCTIONS_QUERY:
      const queryAuctionsLevel = state.queryAuctionsLevel === QueryAuctionsLevel.initial
        ? QueryAuctionsLevel.fetching
        : QueryAuctionsLevel.refetching;
      return { ...state, queryAuctionsLevel };
    case RECEIVE_AUCTIONS_QUERY:
      if (action.payload === null) {
        return { ...state, queryAuctionsLevel: QueryAuctionsLevel.failure };
      }

      return { ...state, queryAuctionsLevel: QueryAuctionsLevel.success, queryAuctionResults: action.payload.items };
    default:
      return state;
  }
};
