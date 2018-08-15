import {
    IExpansion,
    IProfession,
    IProfile,
    IRealm,
    IRealms,
    IRegion,
    IRegions,
    ItemClasses,
    IUserPreferences,
} from "./global";

export interface IMainState {
    fetchPingLevel: FetchPingLevel;
    profile: IProfile | null;
    userPreferences: IUserPreferences | null;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
    preloadedToken: string;
    isRegistered: boolean;
    isLoggedIn: boolean;
    regions: IRegions;
    currentRegion: IRegion | null;
    fetchRealmLevel: FetchRealmLevel;
    realms: IRealms;
    currentRealm: IRealm | null;
    authLevel: AuthLevel;
    isLoginDialogOpen: boolean;
    expansions: IExpansion[];
    professions: IProfession[];
    itemClasses: ItemClasses;
    fetchBootLevel: FetchBootLevel;
}

export enum FetchPingLevel {
    initial,
    fetching,
    success,
    failure,
}

export enum FetchBootLevel {
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
    expansions: [],
    fetchBootLevel: FetchBootLevel.initial,
    fetchPingLevel: FetchPingLevel.initial,
    fetchRealmLevel: FetchRealmLevel.initial,
    fetchUserPreferencesLevel: FetchUserPreferencesLevel.initial,
    isLoggedIn: false,
    isLoginDialogOpen: false,
    isRegistered: false,
    itemClasses: {},
    preloadedToken: "",
    professions: [],
    profile: null,
    realms: {},
    regions: {},
    userPreferences: null,
};
