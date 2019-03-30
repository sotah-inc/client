import { connect } from "react-redux";

import { FetchUserPreferencesCreate, FetchUserPreferencesUpdate } from "@app/actions/main";
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

const mapDispatchToProps: IDispatchProps = {
    createUserPreferences: FetchUserPreferencesCreate,
    updateUserPreferences: FetchUserPreferencesUpdate,
};

export const RealmToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmToggle);
