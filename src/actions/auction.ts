import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Auction } from '../types/auction';
import { Region, Realm } from '../types/main';
import { getAuctions } from '../api/data';

export const REQUEST_AUCTIONS = 'REQUEST_AUCTIONS';
export const RECEIVE_AUCTIONS = 'RECEIVE_AUCTIONS';
const RequestAuctions = () => createAction(REQUEST_AUCTIONS);
const ReceiveAuctions = (payload: Auction[] | null) => createAction(RECEIVE_AUCTIONS, payload);
type FetchAuctionsType = ReturnType<typeof RequestAuctions | typeof ReceiveAuctions>;
export const FetchAuctions = (region: Region, realm: Realm) => {
  return async (dispatch: Dispatch<FetchAuctionsType>) => {
    dispatch(RequestAuctions());
    dispatch(ReceiveAuctions(await getAuctions(region.name, realm.slug)));
  };
};

export const AuctionActions = {
  RequestAuctions, ReceiveAuctions
};

export type AuctionActions = ActionsUnion<typeof AuctionActions>;
