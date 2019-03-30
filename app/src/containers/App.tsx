import { connect } from "react-redux";

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

const mapDispatchToProps: IDispatchProps = {
    boot: FetchGetBoot,
    changeAuthLevel: ChangeAuthLevel,
    changeIsLoginDialogOpen: ChangeIsLoginDialogOpen,
    loadUserPreferences: FetchGetUserPreferences,
    onLoad: FetchGetPing,
    reloadUser: FetchUserReload,
};

export const AppContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(App);
