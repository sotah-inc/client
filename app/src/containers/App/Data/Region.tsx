import { connect } from "react-redux";

import { FetchGetRealms, RegionChange } from "@app/actions/main";
import { IDispatchProps, IOwnProps, IStateProps, Region } from "@app/components/App/Data/Region";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, authLevel, regions, fetchRealmLevel } = state.Main;
    return { currentRegion, currentRealm, authLevel, regions, fetchRealmLevel };
};

const mapDispatchToProps: IDispatchProps = {
    fetchRealms: FetchGetRealms,
    onRegionChange: RegionChange,
};

export const RegionContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Region);
