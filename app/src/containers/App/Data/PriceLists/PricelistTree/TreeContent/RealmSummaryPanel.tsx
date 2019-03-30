import { connect } from "react-redux";

import { FetchGetUnmetDemand, NavigateProfessionNode } from "@app/actions/price-lists";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    RealmSummaryPanel,
} from "@app/components/App/Data/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { expansions, professions } = state.Main;
    const { unmetDemandItemIds, unmetDemandProfessionPricelists, getUnmetDemandLevel, items } = state.PriceLists;
    return { expansions, getUnmetDemandLevel, items, professions, unmetDemandItemIds, unmetDemandProfessionPricelists };
};

const mapDispatchToProps: IDispatchProps = {
    navigateProfessionNode: NavigateProfessionNode,
    refreshUnmetDemand: FetchGetUnmetDemand,
};

export const RealmSummaryPanelContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmSummaryPanel);
