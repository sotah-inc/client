import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetPricelistHistory } from "@app/actions/price-lists";
import { IGetPriceListHistoryOptions } from "@app/api/data";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    PricelistHistoryGraph,
} from "@app/components/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/PricelistHistoryGraph";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        items,
        getPricelistHistoryLevel,
        pricelistHistoryMap,
        itemsPriceLimits,
        overallPriceLimits,
    } = state.PriceLists;
    return { getPricelistHistoryLevel, items, pricelistHistoryMap, itemsPriceLimits, overallPriceLimits };
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
