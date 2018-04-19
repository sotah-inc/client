import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchRegions, FetchRealms, FetchAuctions, PageChange } from '@app/actions/auction';
import { GetAuctionsOptions } from '@app/api/data';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel } = state.Main;
  const {
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    fetchAuctionsLevel,
    auctions,
    currentPage,
    auctionsPerPage,
    totalResults
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
    totalResults
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
    refreshAuctions: (opts: GetAuctionsOptions) => dispatch(FetchAuctions(opts)),
    setCurrentPage: (page: number) => dispatch(PageChange(page))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
