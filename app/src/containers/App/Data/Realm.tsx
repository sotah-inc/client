import { connect } from "react-redux";

import { FetchGetRealms, RealmChange, RegionChange } from "@app/actions/main";
import { IDispatchProps, IOwnProps, IStateProps, Realm } from "@app/components/App/Data/Realm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel, realms, currentRegion, currentRealm, authLevel, regions } = state.Main;
    return { realms, fetchRealmLevel, currentRegion, currentRealm, authLevel, regions };
};

const mapDispatchToProps: IDispatchProps = {
    fetchRealms: FetchGetRealms,
    onRealmChange: RealmChange,
    onRegionChange: RegionChange,
};

export const RealmContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Realm);
