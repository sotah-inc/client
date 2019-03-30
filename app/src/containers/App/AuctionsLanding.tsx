import { connect } from "react-redux";

import { FetchGetRealms, RegionChange } from "@app/actions/main";
import { AuctionsLanding, IDispatchProps, IOwnProps, IStateProps } from "@app/components/App/AuctionsLanding";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, currentRegion, fetchRealmLevel, regions } = state.Main;
    return { currentRealm, currentRegion, fetchRealmLevel, regions };
};

const mapDispatchToProps: IDispatchProps = {
    fetchRealms: FetchGetRealms,
    onRegionChange: RegionChange,
};

export const AuctionsLandingContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionsLanding);
