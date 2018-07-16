import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import {
  FetchAuctions,
  PageChange,
  FetchAuctionsQuery,
  FetchItemClasses
} from '@app/actions/auction';
import { GetAuctionsOptions, QueryAuctionsOptions } from '@app/api/data';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    currentRegion,
    currentRealm,
    authLevel,
    fetchUserPreferencesLevel,
    userPreferences,
    fetchRealmLevel
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
    fetchItemClassesLevel
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
    fetchRealmLevel
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    refreshAuctions: (opts: GetAuctionsOptions) => dispatch(FetchAuctions(opts)),
    setCurrentPage: (page: number) => dispatch(PageChange(page)),
    refreshAuctionsQuery: (opts: QueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
    refreshItemClasses: () => dispatch(FetchItemClasses())
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
