import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState, Region, Realm } from '../types';
import { FetchPing, FetchRegions, FetchRealms, FetchAuctions, Actions } from '../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel, fetchRegionLevel, currentRegion, fetchRealmLevel, fetchAuctionsLevel, currentRealm } = state;
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
