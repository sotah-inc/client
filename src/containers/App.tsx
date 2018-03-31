import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '../components/App';
import { StoreState } from '../types';
import { FetchPing, SotahClientAction } from '../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return {appLevel: state.appLevel};
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {
      onLoad: () => dispatch(FetchPing())
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
