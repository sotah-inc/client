import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { AddAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { AuctionTable, IDispatchProps, IStateProps } from "@app/components/App/AuctionList/AuctionTable";
import { IStoreState } from "@app/types";
import { IQueryAuctionResult } from "@app/types/auction";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { auctions, selectedQueryAuctionResults } = state.Auction;
    return { auctions, selectedItems: selectedQueryAuctionResults };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
        onAuctionsQuerySelect: (aqItem: IQueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
    };
};

export const AuctionTableContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionTable);
