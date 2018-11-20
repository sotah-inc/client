import { connect } from "react-redux";

import { Data, IOwnProps, IStateProps } from "@app/components/App/Data";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion } = state.Main;
    return { currentRegion };
};

export const DataContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Data);
