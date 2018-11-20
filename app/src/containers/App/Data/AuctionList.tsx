import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchAuctions, FetchAuctionsQuery, PageChange } from "@app/actions/auction";
import { IGetAuctionsOptions, IQueryAuctionsOptions } from "@app/api/data";
import { AuctionList, IDispatchProps, IStateProps } from "@app/components/App/Data/AuctionList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, authLevel, fetchUserPreferencesLevel, userPreferences } = state.Main;
    const {
        fetchAuctionsLevel,
        auctions,
        currentPage,
        auctionsPerPage,
        totalResults,
        sortDirection,
        sortKind,
        queryAuctionsLevel,
        selectedQueryAuctionResults,
        activeSelect,
    } = state.Auction;
    return {
        activeSelect,
        auctions,
        auctionsPerPage,
        authLevel,
        currentPage,
        currentRealm,
        currentRegion,
        fetchAuctionsLevel,
        fetchUserPreferencesLevel,
        queryAuctionsLevel,
        selectedQueryAuctionResults,
        sortDirection,
        sortKind,
        totalResults,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        refreshAuctions: (opts: IGetAuctionsOptions) => dispatch(FetchAuctions(opts)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
        setCurrentPage: (page: number) => dispatch(PageChange(page)),
    };
};

export const AuctionsListContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionList);
