import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState } from '../types';
import { Region, Realm } from '../types/main';
import { Actions } from '../actions';
import { FetchPing, FetchRegions, FetchRealms } from '../actions/main';
import { FetchAuctions } from '../actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel, fetchRegionLevel, currentRegion, fetchRealmLevel, currentRealm } = state.Main;
  const { fetchAuctionsLevel } = state.Auction;
  return { fetchPingLevel, fetchRegionLevel, currentRegion, fetchRealmLevel, fetchAuctionsLevel, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing()),
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
    refreshAuctions: (region: Region, realm: Realm) => dispatch(FetchAuctions(region, realm))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
