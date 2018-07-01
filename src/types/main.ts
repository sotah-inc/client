import { Profile, Regions, Region, Realms, Realm } from './global';

export type MainState = {
  fetchPingLevel: FetchPingLevel
  profile: Profile | null
  isRegistered: boolean
  isLoggedIn: boolean
  fetchRegionLevel: FetchRegionLevel
  regions: Regions
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  realms: Realms
  currentRealm: Realm | null
};

export enum FetchPingLevel { initial, fetching, success, failure }

export enum FetchRegionLevel { initial, fetching, success, failure }

export enum FetchRealmLevel { initial, fetching, success, failure }

export const defaultMainState: MainState = {
  fetchPingLevel: FetchPingLevel.initial,
  profile: null,
  isRegistered: false,
  isLoggedIn: false,
  fetchRegionLevel: FetchRegionLevel.initial,
  regions: {},
  currentRegion: null,
  fetchRealmLevel: FetchRealmLevel.initial,
  realms: {},
  currentRealm: null
};
