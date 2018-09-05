import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetPricelist } from "@app/actions/price-lists";
import { IGetPriceListOptions } from "@app/api/data";
import {
    CurrentPricesTable,
    IDispatchProps,
    IOwnProps,
    IStateProps,
} from "@app/components/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items, getPricelistLevel, pricelistMap } = state.PriceLists;
    return { getPricelistLevel, items, pricelistMap };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        reloadPrices: (opts: IGetPriceListOptions) => dispatch(FetchGetPricelist(opts)),
    };
};

export const CurrentPricesTableContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CurrentPricesTable);
