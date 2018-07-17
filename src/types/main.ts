import { Profile, Regions, Region, Realms, Realm, UserPreferences } from './global';

export type MainState = {
  fetchPingLevel: FetchPingLevel
  profile: Profile | null
  userPreferences: UserPreferences | null
  fetchUserPreferencesLevel: FetchUserPreferencesLevel
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

export enum FetchRealmLevel { initial, prompted, fetching, success, failure }

export enum FetchUserPreferencesLevel { initial, fetching, success, failure }

export enum AuthLevel { initial, authenticated, unauthenticated }

export const defaultMainState: MainState = {
  fetchPingLevel: FetchPingLevel.initial,
  profile: null,
  userPreferences: null,
  fetchUserPreferencesLevel: FetchUserPreferencesLevel.initial,
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
