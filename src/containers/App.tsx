import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '@app/components/App';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchPing, FetchRegions, FetchRealms, FetchUserReload } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    fetchPingLevel,
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    preloadedToken
  } = state.Main;
  return {
    fetchPingLevel, 
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    preloadedToken
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing()),
    reloadUser: (token: string) => dispatch(FetchUserReload(token)),
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
