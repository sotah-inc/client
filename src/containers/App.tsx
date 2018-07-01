import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '@app/components/App';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import { FetchPing } from '@app/actions/main';
import { FetchRegions, FetchRealms } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    fetchPingLevel,
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm
  } = state.Main;
  return {
    fetchPingLevel, 
    fetchRegionLevel,
    currentRegion,
    fetchRealmLevel,
    currentRealm
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing()),
    refreshRegions: () => dispatch(FetchRegions()),
    refreshRealms: (region: Region) => dispatch(FetchRealms(region))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
