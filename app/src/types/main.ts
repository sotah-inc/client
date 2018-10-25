import {
    IExpansion,
    IProfession,
    IProfile,
    IRealm,
    IRealms,
    IRegion,
    IRegions,
    ItemClasses,
} from "./global";
import { IPreferenceJson } from "@app/api-types/entities";

export interface IMainState {
    fetchPingLevel: FetchLevel;
    profile: IProfile | null;
    userPreferences: IPreferenceJson | null;
    fetchUserPreferencesLevel: FetchLevel;
    preloadedToken: string;
    isRegistered: boolean;
    isLoggedIn: boolean;
    regions: IRegions;
    currentRegion: IRegion | null;
    fetchRealmLevel: FetchLevel;
    realms: IRealms;
    currentRealm: IRealm | null;
    authLevel: AuthLevel;
    isLoginDialogOpen: boolean;
    expansions: IExpansion[];
    professions: IProfession[];
    itemClasses: ItemClasses;
    fetchBootLevel: FetchLevel;
}

export enum FetchLevel {
    initial,
    prompted,
    fetching,
    refetching,
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
    fetchBootLevel: FetchLevel.initial,
    fetchPingLevel: FetchLevel.initial,
    fetchRealmLevel: FetchLevel.initial,
    fetchUserPreferencesLevel: FetchLevel.initial,
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
