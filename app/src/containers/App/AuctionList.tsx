import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchAuctions, FetchAuctionsQuery, FetchItemClasses, PageChange } from "@app/actions/auction";
import { IGetAuctionsOptions, IQueryAuctionsOptions } from "@app/api/data";
import { AuctionList, DispatchProps, OwnProps, StateProps } from "@app/components/App/AuctionList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
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
        fetchItemClassesLevel,
    } = state.Auction;
    return {
        currentRegion,
        fetchAuctionsLevel,
        currentRealm,
        auctions,
        currentPage,
        auctionsPerPage,
        totalResults,
        sortDirection,
        sortKind,
        queryAuctionsLevel,
        selectedQueryAuctionResults,
        fetchItemClassesLevel,
        authLevel,
        fetchUserPreferencesLevel,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        refreshAuctions: (opts: IGetAuctionsOptions) => dispatch(FetchAuctions(opts)),
        setCurrentPage: (page: number) => dispatch(PageChange(page)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
        refreshItemClasses: () => dispatch(FetchItemClasses()),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionList);
