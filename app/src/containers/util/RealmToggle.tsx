import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchUserPreferencesCreate, FetchUserPreferencesUpdate, RealmChange } from "@app/actions/main";
import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from "@app/api/user";
import { DispatchProps, OwnProps, RealmToggle, StateProps } from "@app/components/util/RealmToggle";
import { IStoreState } from "@app/types";
import { IRealm } from "@app/types/global";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { realms, currentRealm, fetchRealmLevel, userPreferences, authLevel, profile, currentRegion } = state.Main;
    return {
        realms,
        currentRealm,
        fetchRealmLevel,
        userPreferences,
        authLevel,
        profile,
        currentRegion,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onRealmChange: (realm: IRealm) => dispatch(RealmChange(realm)),
        createUserPreferences: (token: string, body: ICreatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesCreate(token, body)),
        updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesUpdate(token, body)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmToggle);
