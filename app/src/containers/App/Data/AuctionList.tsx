import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchAuctions, FetchAuctionsQuery, PageChange } from "@app/actions/auction";
import { FetchGetRealms, RealmChange, RegionChange } from "@app/actions/main";
import { IRealm, IRegion } from "@app/api-types/region";
import { IGetAuctionsOptions, IQueryAuctionsOptions } from "@app/api/data";
import { AuctionList, IDispatchProps, IStateProps } from "@app/components/App/Data/AuctionList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        currentRegion,
        currentRealm,
        authLevel,
        fetchUserPreferencesLevel,
        userPreferences,
        fetchRealmLevel,
        realms,
        regions,
    } = state.Main;
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
        fetchRealmLevel,
        fetchUserPreferencesLevel,
        queryAuctionsLevel,
        realms,
        regions,
        selectedQueryAuctionResults,
        sortDirection,
        sortKind,
        totalResults,
        userPreferences,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        fetchRealms: (region: IRegion) => dispatch(FetchGetRealms(region)),
        onRealmChange: (realm: IRealm) => dispatch(RealmChange(realm)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
        refreshAuctions: (opts: IGetAuctionsOptions) => dispatch(FetchAuctions(opts)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
        setCurrentPage: (page: number) => dispatch(PageChange(page)),
    };
};

export const AuctionsListContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AuctionList);
