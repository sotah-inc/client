import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState } from '../types';
import { SotahClientAction, FetchPing, FetchRegions } from '../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { appLevel, regions, currentRegionName } = state;
  return { appLevel, regions, currentRegionName };
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing()),
    refreshRegions: () => dispatch(FetchRegions())
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
