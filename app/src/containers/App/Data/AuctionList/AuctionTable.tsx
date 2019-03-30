import { connect } from "react-redux";

import { AddAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { AuctionTable, IDispatchProps, IStateProps } from "@app/components/App/Data/AuctionList/AuctionTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { professions, expansions, currentRealm, currentRegion } = state.Main;
    const { auctions, selectedQueryAuctionResults, items, relatedProfessionPricelists } = state.Auction;

    return {
        auctions,
        currentRealm,
        currentRegion,
        expansions,
        items,
        professions,
        relatedProfessionPricelists,
        selectedItems: selectedQueryAuctionResults,
    };
};

const mapDispatchToProps: IDispatchProps = {
    onAuctionsQueryDeselect: RemoveAuctionsQuery,
    onAuctionsQuerySelect: AddAuctionsQuery,
};

export const AuctionTableContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionTable);
