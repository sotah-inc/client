import { connect } from "react-redux";

import {
    IStateProps,
    RealmSummaryPanel,
} from "@app/components/App/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm } = state.Main;
    return { currentRealm };
};

export const RealmSummaryPanelContainer = connect<IStateProps>(mapStateToProps)(RealmSummaryPanel);
