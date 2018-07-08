import { connect, Dispatch } from 'react-redux';

import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { App, StateProps, DispatchProps, OwnProps } from '@app/components/App';
import { Actions } from '@app/actions';
import { FetchPing, FetchRegions, FetchRealms, FetchUserReload, ChangeIsLoginDialogOpen } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    fetchPingLevel,
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    preloadedToken,
    authLevel,
    isLoginDialogOpen
  } = state.Main;
  return {
    fetchPingLevel, 
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm,
    preloadedToken,
    authLevel,
    isLoginDialogOpen
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing()),
    reloadUser: (token: string) => dispatch(FetchUserReload(token)),
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region)),
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
