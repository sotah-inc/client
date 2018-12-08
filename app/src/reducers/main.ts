import {
    CHANGE_AUTH_LEVEL,
    CHANGE_IS_LOGIN_DIALOG_OPEN,
    CHANGE_IS_REGISTER_DIALOG_OPEN,
    MainActions,
    REALM_CHANGE,
    RECEIVE_USER_RELOAD,
    REGION_CHANGE,
    USER_LOGIN,
    USER_REGISTER,
} from "@app/actions/main";
import { AuthLevel, defaultMainState, FetchLevel, IMainState } from "@app/types/main";
import { runners } from "./handlers";

type State = Readonly<IMainState> | undefined;

export const main = (state: State, action: MainActions): State => {
    if (state === undefined) {
        return defaultMainState;
    }

    switch (action.type) {
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
        case REGION_CHANGE:
            return { ...state, currentRegion: action.payload, fetchRealmLevel: FetchLevel.prompted };
        case REALM_CHANGE:
            return { ...state, currentRealm: action.payload };
        case CHANGE_IS_LOGIN_DIALOG_OPEN:
            return { ...state, isLoginDialogOpen: action.payload };
        case CHANGE_IS_REGISTER_DIALOG_OPEN:
            return { ...state, isRegisterDialogOpen: action.payload };
        default:
            return runners.main(state, action);
    }
};
