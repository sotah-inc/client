import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Region, Realm } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchRegions, FetchRealms } from '@app/actions/auction';
import { FetchAuctions } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel } = state.Main;
  const {
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    fetchAuctionsLevel,
    auctions
  } = state.Auction;
  return {
    fetchPingLevel,
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    fetchAuctionsLevel,
    currentRealm,
    auctions
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
    refreshAuctions: (region: Region, realm: Realm) => dispatch(FetchAuctions(region, realm))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
