import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import {
  FetchAuctions,
  PageChange,
  FetchAuctionsQuery,
  FetchItemClasses
} from '@app/actions/auction';
import { FetchRegions, FetchRealms } from '@app/actions/main';
import { GetAuctionsOptions, QueryAuctionsOptions } from '@app/api/data';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    fetchPingLevel, 
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm
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
    fetchPingLevel,
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
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
    fetchItemClassesLevel
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
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
