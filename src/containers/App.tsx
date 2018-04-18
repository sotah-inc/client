import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState } from '../types';
import { Region, Realm } from '../types/global';
import { Actions } from '../actions';
import { FetchPing } from '../actions/main';
import { FetchRegions, FetchRealms } from '../actions/auction';
import { FetchAuctions } from '../actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel } = state.Main;
  const { fetchAuctionsLevel, currentRegion, currentRealm, fetchRegionLevel, fetchRealmLevel } = state.Auction;
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
