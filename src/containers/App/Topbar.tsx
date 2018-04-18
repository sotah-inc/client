import { connect, Dispatch } from 'react-redux';

import { Topbar, StateProps, DispatchProps, OwnProps } from '@app/components/App/Topbar';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const user = state.Main.profile === null ? null : state.Main.profile.user;
  return { user };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Topbar);
