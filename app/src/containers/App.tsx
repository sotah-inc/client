import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeAuthLevel,
    ChangeIsLoginDialogOpen,
    FetchGetBoot,
    FetchGetPing,
    FetchGetUserPreferences,
    FetchUserReload,
} from "@app/actions/main";
import { App, IDispatchProps, IOwnProps, IStateProps } from "@app/components/App";
import { IStoreState } from "@app/types";
import { AuthLevel } from "@app/types/main";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        fetchBootLevel,
        fetchPingLevel,
        currentRegion,
        fetchRealmLevel,
        currentRealm,
        preloadedToken,
        authLevel,
        isLoginDialogOpen,
        fetchUserPreferencesLevel,
        userPreferences,
        profile,
    } = state.Main;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        fetchBootLevel,
        fetchPingLevel,
        fetchRealmLevel,
        fetchUserPreferencesLevel,
        isLoginDialogOpen,
        preloadedToken,
        profile,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        boot: () => dispatch(FetchGetBoot()),
        changeAuthLevel: (authLevel: AuthLevel) => dispatch(ChangeAuthLevel(authLevel)),
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        loadUserPreferences: (token: string) => dispatch(FetchGetUserPreferences(token)),
        onLoad: () => dispatch(FetchGetPing()),
        reloadUser: (token: string) => dispatch(FetchUserReload(token)),
    };
};

export const AppContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(App);
