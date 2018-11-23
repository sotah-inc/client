import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchRealms, RegionChange } from "@app/actions/main";
import { IRegion } from "@app/api-types/region";
import { IDispatchProps, IOwnProps, IStateProps, Region } from "@app/components/App/Data/Region";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, authLevel, regions, fetchRealmLevel } = state.Main;
    return { currentRegion, currentRealm, authLevel, regions, fetchRealmLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        fetchRealms: (region: IRegion) => dispatch(FetchRealms(region)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    };
};

export const RegionContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Region);
