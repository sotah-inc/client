import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetPricelistHistory } from "@app/actions/price-lists";
import { IGetPriceListHistoryOptions } from "@app/api/data";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    PricelistHistoryGraph,
} from "@app/components/util/PricelistHistoryGraph";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel, profile } = state.Main;

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
        profile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        reloadPricelistHistory: (opts: IGetPriceListHistoryOptions) => dispatch(FetchGetPricelistHistory(opts)),
    };
};

export const PricelistHistoryGraphContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistHistoryGraph);
