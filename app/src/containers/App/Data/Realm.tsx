import { connect } from "react-redux";

import { IOwnProps, IStateProps, Realm } from "@app/components/App/Data/Realm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    return { currentRegion, currentRealm };
};

export const RealmContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Realm);
