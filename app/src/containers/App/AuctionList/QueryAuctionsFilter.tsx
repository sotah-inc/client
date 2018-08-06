import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { AddAuctionsQuery, FetchAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { IQueryAuctionsOptions } from "@app/api/data";
import { IDispatchProps, IStateProps, QueryAuctionsFilter } from "@app/components/App/AuctionList/QueryAuctionsFilter";
import { IStoreState } from "@app/types";
import { IQueryAuctionResult } from "@app/types/auction";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { queryAuctionsLevel, queryAuctionResults, selectedQueryAuctionResults } = state.Auction;
    return {
        currentRealm,
        currentRegion,
        items: queryAuctionResults,
        queryAuctionsLevel,
        selectedItems: selectedQueryAuctionResults,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
        onAuctionsQuerySelect: (aqItem: IQueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
    };
};

export const QueryAuctionsFilterContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(QueryAuctionsFilter);
