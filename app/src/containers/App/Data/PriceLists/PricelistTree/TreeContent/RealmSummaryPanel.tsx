import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetUnmetDemand, IProfessionNode, NavigateProfessionNode } from "@app/actions/price-lists";
import { IGetUnmetDemandOptions } from "@app/api/price-lists";
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        navigateProfessionNode: (node: IProfessionNode) => dispatch(NavigateProfessionNode(node)),
        refreshUnmetDemand: (opts: IGetUnmetDemandOptions) => dispatch(FetchGetUnmetDemand(opts)),
    };
};

export const RealmSummaryPanelContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmSummaryPanel);
