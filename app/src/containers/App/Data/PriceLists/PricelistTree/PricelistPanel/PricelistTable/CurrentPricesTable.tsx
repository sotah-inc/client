import { connect } from "react-redux";

import { FetchGetPricelist } from "@app/actions/price-lists";
import {
    CurrentPricesTable,
    IDispatchProps,
    IOwnProps,
    IStateProps,
} from "@app/components/App/Data/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel } = state.Main;
    const { items, getPricelistLevel, pricelistMap } = state.PriceLists;
    return { fetchRealmLevel, getPricelistLevel, items, pricelistMap };
};

const mapDispatchToProps: IDispatchProps = {
    reloadPrices: FetchGetPricelist,
};

export const CurrentPricesTableContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CurrentPricesTable);
