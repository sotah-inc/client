import { connect } from "react-redux";

import { Data, IOwnProps, IStateProps } from "@app/components/App/Data";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, currentRegion } = state.Main;
    return { currentRealm, currentRegion };
};

export const DataContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Data);
