import { connect } from "react-redux";

import { FetchGetPricelistHistory } from "@app/actions/price-lists";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    PricelistHistoryGraph,
} from "@app/components/util/PricelistHistoryGraph";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel } = state.Main;

    const {
        items: pricelistsItems,
        getPricelistHistoryLevel,
        pricelistHistoryMap,
        itemsPriceLimits,
        overallPriceLimits,
    } = state.PriceLists;

    const { items: auctionItems } = state.Auction;

    return {
        fetchRealmLevel,
        getPricelistHistoryLevel,
        items: { ...pricelistsItems, ...auctionItems },
        itemsPriceLimits,
        overallPriceLimits,
        pricelistHistoryMap,
    };
};

const mapDispatchToProps = {
    reloadPricelistHistory: FetchGetPricelistHistory,
};

export const PricelistHistoryGraphContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistHistoryGraph);
