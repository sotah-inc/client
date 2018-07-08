import { Profile, Regions, Region, Realms, Realm } from './global';

export type MainState = {
  fetchPingLevel: FetchPingLevel
  profile: Profile | null
  preloadedToken: string
  isRegistered: boolean
  isLoggedIn: boolean
  fetchRegionLevel: FetchRegionLevel
  regions: Regions
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  realms: Realms
  currentRealm: Realm | null
  authLevel: AuthLevel
  isLoginDialogOpen: boolean
};

export enum FetchPingLevel { initial, fetching, success, failure }

export enum FetchRegionLevel { initial, fetching, success, failure }

export enum FetchRealmLevel { initial, fetching, success, failure }

export enum AuthLevel { initial, authenticated, unauthenticated }

export const defaultMainState: MainState = {
  fetchPingLevel: FetchPingLevel.initial,
  profile: null,
  preloadedToken: '',
  isRegistered: false,
  isLoggedIn: false,
  fetchRegionLevel: FetchRegionLevel.initial,
  regions: {},
  currentRegion: null,
  fetchRealmLevel: FetchRealmLevel.initial,
  realms: {},
  currentRealm: null,
  authLevel: AuthLevel.initial,
  isLoginDialogOpen: false
};
