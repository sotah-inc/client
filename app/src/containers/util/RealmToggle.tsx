import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchUserPreferencesCreate, FetchUserPreferencesUpdate } from "@app/actions/main";
import { ICreatePreferencesRequest, IUpdatePreferencesRequest } from "@app/api-types/contracts/user/preferences";
import { IDispatchProps, IStateProps, RealmToggle } from "@app/components/util/RealmToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { realms, currentRealm, fetchRealmLevel, userPreferences, authLevel, profile, currentRegion } = state.Main;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        fetchRealmLevel,
        profile,
        realms,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        createUserPreferences: (token: string, body: ICreatePreferencesRequest) =>
            dispatch(FetchUserPreferencesCreate(token, body)),
        updateUserPreferences: (token: string, body: IUpdatePreferencesRequest) =>
            dispatch(FetchUserPreferencesUpdate(token, body)),
    };
};

export const RealmToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmToggle);
