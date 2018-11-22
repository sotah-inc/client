import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { RealmChange, RegionChange } from "@app/actions/main";
import { IRealm, IRegion } from "@app/api-types/region";
import { IDispatchProps, IOwnProps, IStateProps, RealmRouteParser } from "@app/components/util/RealmRouteParser";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel, realms, currentRegion, currentRealm, authLevel, regions } = state.Main;
    return { realms, fetchRealmLevel, currentRegion, currentRealm, authLevel, regions };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onRealmChange: (realm: IRealm) => dispatch(RealmChange(realm)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    };
};

export const RealmRouteParserContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmRouteParser);
