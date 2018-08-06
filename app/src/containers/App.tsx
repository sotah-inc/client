import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeAuthLevel,
    ChangeIsLoginDialogOpen,
    FetchPing,
    FetchRealms,
    FetchRegions,
    FetchUserPreferences,
    FetchUserReload,
} from "@app/actions/main";
import { App, IDispatchProps, IOwnProps, IStateProps } from "@app/components/App";
import { IStoreState } from "@app/types";
import { IRegion } from "@app/types/global";
import { AuthLevel } from "@app/types/main";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        fetchPingLevel,
        fetchRegionLevel,
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
        fetchPingLevel,
        fetchRealmLevel,
        fetchRegionLevel,
        fetchUserPreferencesLevel,
        isLoginDialogOpen,
        preloadedToken,
        profile,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeAuthLevel: (authLevel: AuthLevel) => dispatch(ChangeAuthLevel(authLevel)),
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        loadUserPreferences: (token: string) => dispatch(FetchUserPreferences(token)),
        onLoad: () => dispatch(FetchPing()),
        refreshRealms: (region: IRegion) => dispatch(FetchRealms(region)),
        refreshRegions: () => dispatch(FetchRegions()),
        reloadUser: (token: string) => dispatch(FetchUserReload(token)),
    };
};

export const AppContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(App);
