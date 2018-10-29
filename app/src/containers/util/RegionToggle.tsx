import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { RegionChange } from "@app/actions/main";
import { IRegion } from "@app/api-types/region";
import { IDispatchProps, IStateProps, RegionToggle } from "@app/components/util/RegionToggle";
import { IStoreState } from "@app/types";

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
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    };
};

export const RegionToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegionToggle);
