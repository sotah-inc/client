import {
  AuctionState,
  FetchAuctionsLevel,
  defaultAuctionState
} from '../types/auction';
import {
  AuctionActions,
  REQUEST_AUCTIONS, RECEIVE_AUCTIONS
} from '../actions/auction';

type State = Readonly<AuctionState> | undefined;

export const auction = (state: State, action: AuctionActions): State => {
  if (state === undefined) {
    return defaultAuctionState;
  }

  switch (action.type) {
    case REQUEST_AUCTIONS:
      return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.fetching };
    case RECEIVE_AUCTIONS:
      if (action.payload === null) {
        return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.failure };
      }

      return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.success, items: action.payload };
    default:
      return state;
  }
};
