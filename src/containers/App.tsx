import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '@app/components/App';
import { StoreState } from '@app/types';
import { Region, Realm } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchPing } from '@app/actions/main';
import { FetchRegions, FetchRealms } from '@app/actions/auction';
import { FetchAuctions } from '@app/actions/auction';

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
