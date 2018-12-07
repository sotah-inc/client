import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetItemsOwnership } from "@app/actions/price-lists";
import { IQueryOwnersByItemsOptions } from "@app/api/data";
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        queryOwnersByItems: (opts: IQueryOwnersByItemsOptions) => dispatch(FetchGetItemsOwnership(opts)),
    };
};

export const CurrentSellersTableContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CurrentSellersTable);
