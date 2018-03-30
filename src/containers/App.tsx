import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState } from '../types';
import { FetchRegions, FetchRegionsAction } from '../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<FetchRegionsAction>): DispatchProps => {
  return {
      onLoad: () => dispatch(FetchRegions())
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
