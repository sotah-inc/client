import { connect } from "react-redux";

import { FetchGetItemsOwnership } from "@app/actions/price-lists";
import {
    CurrentSellersTable,
    IDispatchProps,
    IOwnProps,
    IStateProps,
} from "@app/components/App/Data/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentSellersTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchRealmLevel } = state.Main;
    const { getItemsOwnershipLevel, itemsOwnershipMap } = state.PriceLists;
    return { fetchRealmLevel, getItemsOwnershipLevel, itemsOwnershipMap };
};

const mapDispatchToProps: IDispatchProps = {
    queryOwnersByItems: FetchGetItemsOwnership,
};

export const CurrentSellersTableContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CurrentSellersTable);
