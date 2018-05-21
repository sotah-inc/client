import { Auction, Regions, Region, Realms, Realm, Owner, Item } from './global';

export type AuctionState = {
  fetchAuctionsLevel: FetchAuctionsLevel
  auctions: Auction[]
  fetchRegionLevel: FetchRegionLevel
  regions: Regions
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  realms: Realms
  currentRealm: Realm | null
  currentPage: number
  auctionsPerPage: number
  totalResults: number,
  sortDirection: SortDirection
  sortKind: SortKind
  queryAuctionsLevel: QueryAuctionsLevel
  queryAuctionResults: QueryAuctionResult[]
  selectedQueryAuctionResults: QueryAuctionResult[]
};

export enum FetchRegionLevel { initial, fetching, success, failure }

export enum FetchRealmLevel { initial, fetching, success, failure }

export enum FetchAuctionsLevel { initial, fetching, refetching, success, failure }

export enum SortDirection { none, up, down }

export enum SortKind { none, item, quantity, bid, buyout, auctions, owner }

export type SortChangeOptions = {
  sortKind: SortKind
  sortDirection: SortDirection
};

export enum FetchOwnersLevel { initial, fetching, refetching, success, failure }

export enum FetchItemsLevel { initial, fetching, refetching, success, failure }

export enum QueryAuctionsLevel { initial, fetching, refetching, success, failure }

export type QueryAuctionResult = {
  item: Item
  owner: Owner
  target: string
  rank: number
};

export const defaultAuctionState: AuctionState = {
  fetchAuctionsLevel: FetchAuctionsLevel.initial,
  auctions: [],
  fetchRegionLevel: FetchRegionLevel.initial,
  regions: {},
  currentRegion: null,
  fetchRealmLevel: FetchRealmLevel.initial,
  realms: {},
  currentRealm: null,
  currentPage: 0,
  auctionsPerPage: 10,
  totalResults: 0,
  sortDirection: SortDirection.none,
  sortKind: SortKind.none,
  queryAuctionsLevel: QueryAuctionsLevel.initial,
  queryAuctionResults: [],
  selectedQueryAuctionResults: []
};
