import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetUnmetDemand } from "@app/actions/price-lists";
import { IGetUnmetDemandRequestOptions } from "@app/api/price-lists";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    RealmSummaryPanel,
} from "@app/components/App/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { expansions, professions } = state.Main;
    const { unmetDemandItemIds, unmetDemandProfessionPricelists, getUnmetDemandLevel, items } = state.PriceLists;
    return { expansions, getUnmetDemandLevel, items, professions, unmetDemandItemIds, unmetDemandProfessionPricelists };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        refreshUnmetDemand: (opts: IGetUnmetDemandRequestOptions) => dispatch(FetchGetUnmetDemand(opts)),
    };
};

export const RealmSummaryPanelContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RealmSummaryPanel);
