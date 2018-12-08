import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetRealms, RegionChange } from "@app/actions/main";
import { IRegion } from "@app/api-types/region";
import { AuctionsLanding, IDispatchProps, IOwnProps, IStateProps } from "@app/components/App/AuctionsLanding";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, currentRegion, fetchRealmLevel, regions } = state.Main;
    return { currentRealm, currentRegion, fetchRealmLevel, regions };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        fetchRealms: (region: IRegion) => dispatch(FetchGetRealms(region)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    };
};

export const AuctionsLandingContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionsLanding);
