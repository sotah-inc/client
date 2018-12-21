import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { AddAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
        onAuctionsQuerySelect: (aqItem: IQueryAuctionsItem) => dispatch(AddAuctionsQuery(aqItem)),
    };
};

export const AuctionTableContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionTable);
