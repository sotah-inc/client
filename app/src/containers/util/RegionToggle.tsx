import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchUserPreferencesCreate, FetchUserPreferencesUpdate, RegionChange } from "@app/actions/main";
import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from "@app/api/user";
import { DispatchProps, OwnProps, RegionToggle, StateProps } from "@app/components/util/RegionToggle";
import { IStoreState } from "@app/types";
import { IRegion } from "@app/types/global";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { regions, currentRegion, fetchRegionLevel } = state.Main;
    return {
        regions,
        currentRegion,
        fetchRegionLevel,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
        createUserPreferences: (token: string, body: ICreatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesCreate(token, body)),
        updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesUpdate(token, body)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegionToggle);
