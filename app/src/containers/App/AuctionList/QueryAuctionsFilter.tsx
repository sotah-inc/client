import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { AddAuctionsQuery, FetchAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { IQueryAuctionsOptions } from "@app/api/data";
import {
    DispatchProps,
    OwnProps,
    QueryAuctionsFilter,
    StateProps,
} from "@app/components/App/AuctionList/QueryAuctionsFilter";
import { IStoreState } from "@app/types";
import { IQueryAuctionResult } from "@app/types/auction";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { queryAuctionsLevel, queryAuctionResults, selectedQueryAuctionResults } = state.Auction;
    return {
        queryAuctionsLevel,
        currentRegion,
        currentRealm,
        items: queryAuctionResults,
        selectedItems: selectedQueryAuctionResults,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onAuctionsQuerySelect: (aqItem: IQueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
        onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(QueryAuctionsFilter);
