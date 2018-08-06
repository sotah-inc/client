import { IProfile, IRealm, IRealms, IRegion, IRegions, IUserPreferences } from "./global";

export interface IMainState {
    fetchPingLevel: FetchPingLevel;
    profile: IProfile | null;
    userPreferences: IUserPreferences | null;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
    preloadedToken: string;
    isRegistered: boolean;
    isLoggedIn: boolean;
    fetchRegionLevel: FetchRegionLevel;
    regions: IRegions;
    currentRegion: IRegion | null;
    fetchRealmLevel: FetchRealmLevel;
    realms: IRealms;
    currentRealm: IRealm | null;
    authLevel: AuthLevel;
    isLoginDialogOpen: boolean;
}

export enum FetchPingLevel {
    initial,
    fetching,
    success,
    failure,
}

export enum FetchRegionLevel {
    initial,
    prompted,
    fetching,
    success,
    failure,
}

export enum FetchRealmLevel {
    initial,
    prompted,
    fetching,
    success,
    failure,
}

export enum FetchUserPreferencesLevel {
    initial,
    fetching,
    success,
    failure,
}

export enum AuthLevel {
    initial,
    authenticated,
    unauthenticated,
}

export const defaultMainState: IMainState = {
    authLevel: AuthLevel.initial,
    currentRealm: null,
    currentRegion: null,
    fetchPingLevel: FetchPingLevel.initial,
    fetchRealmLevel: FetchRealmLevel.initial,
    fetchRegionLevel: FetchRegionLevel.initial,
    fetchUserPreferencesLevel: FetchUserPreferencesLevel.initial,
    isLoggedIn: false,
    isLoginDialogOpen: false,
    isRegistered: false,
    preloadedToken: "",
    profile: null,
    realms: {},
    regions: {},
    userPreferences: null,
};
