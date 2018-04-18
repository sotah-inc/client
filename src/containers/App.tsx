import { connect, Dispatch } from 'react-redux';

import { App, StateProps, DispatchProps, OwnProps } from '@app/components/App';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { FetchPing } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchPingLevel } = state.Main;
  return { fetchPingLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onLoad: () => dispatch(FetchPing())
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
