import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetRealms, RegionChange } from "@app/actions/main";
import { IRegion } from "@app/api-types/region";
import { IDispatchProps, IOwnProps, IStateProps, ProfessionsLanding } from "@app/components/App/ProfessionsLanding";
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

export const ProfessionsLandingContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ProfessionsLanding);
