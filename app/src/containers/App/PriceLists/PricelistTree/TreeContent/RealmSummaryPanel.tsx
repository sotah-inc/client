import { connect } from "react-redux";

import {
    IStateProps,
    RealmSummaryPanel,
} from "@app/components/App/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, currentRegion, expansions } = state.Main;
    return { currentRealm, currentRegion, expansions };
};

export const RealmSummaryPanelContainer = connect<IStateProps>(mapStateToProps)(RealmSummaryPanel);
