import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchUserPreferencesCreate, FetchUserPreferencesUpdate, RegionChange } from "@app/actions/main";
import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from "@app/api/user";
import { IDispatchProps, IStateProps, RegionToggle } from "@app/components/util/RegionToggle";
import { IStoreState } from "@app/types";
import { IRegion } from "@app/types/global";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { regions, currentRegion, fetchBootLevel } = state.Main;
    return {
        currentRegion,
        fetchBootLevel,
        regions,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        createUserPreferences: (token: string, body: ICreatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesCreate(token, body)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
        updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) =>
            dispatch(FetchUserPreferencesUpdate(token, body)),
    };
};

export const RegionToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegionToggle);
