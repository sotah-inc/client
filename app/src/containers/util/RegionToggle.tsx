import { connect } from "react-redux";

import { RegionChange } from "@app/actions/main";
import { IDispatchProps, IStateProps, RegionToggle } from "@app/components/util/RegionToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { regions, currentRegion } = state.Main;
    return {
        currentRegion,
        regions,
    };
};

const mapDispatchToProps: IDispatchProps = {
    onRegionChange: RegionChange,
};

export const RegionToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegionToggle);
