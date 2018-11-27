import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetRealms, RealmChange, RegionChange } from "@app/actions/main";
import { IRealm, IRegion } from "@app/api-types/region";
import { IDispatchProps, IOwnProps, IStateProps, Realm } from "@app/components/App/Data/Realm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel, realms, currentRegion, currentRealm, authLevel, regions } = state.Main;
    return { realms, fetchRealmLevel, currentRegion, currentRealm, authLevel, regions };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        fetchRealms: (region: IRegion) => dispatch(FetchGetRealms(region)),
        onRealmChange: (realm: IRealm) => dispatch(RealmChange(realm)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    };
};

export const RealmContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Realm);
