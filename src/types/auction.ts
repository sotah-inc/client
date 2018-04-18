export type AuctionState = {
  items: Auction[]
  fetchAuctionsLevel: FetchAuctionsLevel
};

export enum FetchAuctionsLevel { initial, fetching, success, failure }

export type Auction = {
  item: number
  owner: string
  ownerRealm: string
  bid: number
  buyout: number
  quantity: number
  timeLeft: string
  aucList: number[]
};

export const defaultAuctionState: AuctionState = {
  items: [],
  fetchAuctionsLevel: FetchAuctionsLevel.initial
};
