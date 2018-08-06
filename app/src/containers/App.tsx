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
import { App, DispatchProps, OwnProps, StateProps } from "@app/components/App";
import { IStoreState } from "@app/types";
import { IRegion } from "@app/types/global";
import { AuthLevel } from "@app/types/main";

const mapStateToProps = (state: IStoreState): StateProps => {
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
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onLoad: () => dispatch(FetchPing()),
        reloadUser: (token: string) => dispatch(FetchUserReload(token)),
        refreshRegions: () => dispatch(FetchRegions()),
        refreshRealms: (region: IRegion) => dispatch(FetchRealms(region)),
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        loadUserPreferences: (token: string) => dispatch(FetchUserPreferences(token)),
        changeAuthLevel: (authLevel: AuthLevel) => dispatch(ChangeAuthLevel(authLevel)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(App);
