import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchRegions, FetchRealms } from '@app/actions/auction';
import { FetchAuctions } from '@app/actions/auction';
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
    auctionsPerPage
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
    auctionsPerPage
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
    refreshAuctions: (opts: GetAuctionsOptions) => dispatch(FetchAuctions(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
