import { Auction, Regions, Region, Realms, Realm } from './global';

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
  totalResults: number
};

export enum FetchRegionLevel { initial, fetching, success, failure }

export enum FetchRealmLevel { initial, fetching, success, failure }

export enum FetchAuctionsLevel { initial, fetching, refetching, success, failure }

export const defaultAuctionState: AuctionState = {
  fetchAuctionsLevel: FetchAuctionsLevel.initial,
  auctions: [],
  fetchRegionLevel: FetchRegionLevel.initial,
  regions: {},
  currentRegion: null,
  fetchRealmLevel: FetchRealmLevel.initial,
  realms: {},
  currentRealm: null,
  currentPage: 2638,
  auctionsPerPage: 10,
  totalResults: 0
};
