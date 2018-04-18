import { Profile } from './global';

export type MainState = {
  fetchPingLevel: FetchPingLevel
  profile: Profile | null
  isRegistered: boolean
  isLoggedIn: boolean
};

// ping types
export enum FetchPingLevel { initial, fetching, success, failure }

export const defaultMainState: MainState = {
  fetchPingLevel: FetchPingLevel.initial,
  profile: null,
  isRegistered: false,
  isLoggedIn: false
};
