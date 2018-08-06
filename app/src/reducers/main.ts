import {
    CHANGE_AUTH_LEVEL,
    CHANGE_IS_LOGIN_DIALOG_OPEN,
    MainActions,
    REALM_CHANGE,
    RECEIVE_PING,
    RECEIVE_REALMS,
    RECEIVE_REGIONS,
    RECEIVE_USER_PREFERENCES,
    RECEIVE_USER_RELOAD,
    REGION_CHANGE,
    REQUEST_PING,
    REQUEST_REALMS,
    REQUEST_REGIONS,
    REQUEST_USER_PREFERENCES,
    USER_LOGIN,
    USER_REGISTER,
} from "@app/actions/main";
import { IRealm, IRealms, IRegion, IRegions } from "@app/types/global";
import {
    AuthLevel,
    defaultMainState,
    FetchPingLevel,
    FetchRealmLevel,
    FetchRegionLevel,
    FetchUserPreferencesLevel,
    IMainState,
} from "@app/types/main";

type State = Readonly<IMainState> | undefined;

export const main = (state: State, action: MainActions): State => {
    if (state === undefined) {
        return defaultMainState;
    }

    switch (action.type) {
        case REQUEST_PING:
            return { ...state, fetchPingLevel: FetchPingLevel.fetching };
        case RECEIVE_PING:
            if (action.payload === false) {
                return { ...state, fetchPingLevel: FetchPingLevel.failure };
            }

            return { ...state, fetchPingLevel: FetchPingLevel.success };
        case USER_REGISTER:
            return { ...state, profile: action.payload, isRegistered: true, authLevel: AuthLevel.authenticated };
        case USER_LOGIN:
            return { ...state, profile: action.payload, isLoggedIn: true, authLevel: AuthLevel.authenticated };
        case RECEIVE_USER_RELOAD:
            if (action.payload.error !== null) {
                return { ...state, authLevel: AuthLevel.unauthenticated };
            }

            return {
                ...state,
                authLevel: AuthLevel.authenticated,
                profile: { user: action.payload.user!, token: state.preloadedToken },
            };
        case CHANGE_AUTH_LEVEL:
            return { ...state, authLevel: action.payload };
        case REQUEST_USER_PREFERENCES:
            return { ...state, fetchUserPreferencesLevel: FetchUserPreferencesLevel.fetching };
        case RECEIVE_USER_PREFERENCES:
            if (action.payload.error !== null) {
                return { ...state, fetchUserPreferencesLevel: FetchUserPreferencesLevel.failure };
            }

            return {
                ...state,
                fetchRegionLevel: FetchRegionLevel.prompted,
                fetchUserPreferencesLevel: FetchUserPreferencesLevel.success,
                userPreferences: action.payload.preference,
            };
        case REQUEST_REGIONS:
            return { ...state, fetchRegionLevel: FetchRegionLevel.fetching };
        case RECEIVE_REGIONS:
            if (action.payload === null) {
                return { ...state, fetchRegionLevel: FetchRegionLevel.failure };
            }

            let currentRegion: IRegion | null = action.payload[0];
            if (state.userPreferences !== null) {
                const { current_region: preferredRegionName } = state.userPreferences;
                currentRegion = action.payload.reduce((result, v) => {
                    if (result !== null) {
                        return result;
                    }

                    if (v.name === preferredRegionName) {
                        return v;
                    }

                    return null;
                }, null);
            }

            const regions: IRegions = action.payload.reduce(
                (result, region) => ({ ...result, [region.name]: region }),
                {},
            );

            return {
                ...state,
                currentRegion,
                fetchRealmLevel: FetchRealmLevel.prompted,
                fetchRegionLevel: FetchRegionLevel.success,
                regions,
            };
        case REGION_CHANGE:
            return { ...state, currentRegion: action.payload, fetchRealmLevel: FetchRealmLevel.prompted };
        case REQUEST_REALMS:
            return { ...state, fetchRealmLevel: FetchRealmLevel.fetching };
        case RECEIVE_REALMS:
            if (action.payload === null) {
                return { ...state, fetchRealmLevel: FetchRealmLevel.failure };
            }

            let currentRealm: IRealm | null = action.payload[0];
            if (state.userPreferences !== null) {
                const {
                    current_region: preferredRegionName,
                    current_realm: preferredRealmSlug,
                } = state.userPreferences;
                if (state.currentRegion!.name === preferredRegionName) {
                    currentRealm = action.payload.reduce((result, v) => {
                        if (result !== null) {
                            return result;
                        }

                        if (v.slug === preferredRealmSlug) {
                            return v;
                        }

                        return null;
                    }, null);
                }
            }

            const realms: IRealms = action.payload.reduce((result, realm) => ({ ...result, [realm.slug]: realm }), {});

            return { ...state, fetchRealmLevel: FetchRealmLevel.success, realms, currentRealm };
        case REALM_CHANGE:
            return { ...state, currentRealm: action.payload };
        case CHANGE_IS_LOGIN_DIALOG_OPEN:
            return { ...state, isLoginDialogOpen: action.payload };
        default:
            return state;
    }
};
