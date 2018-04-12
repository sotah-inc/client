import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '../../components/App/Login';
import Login from '../../form-containers/App/Login';
import { StoreState, Profile } from '../../types';
import { Actions } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return { isLoggedIn: state.isLoggedIn };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onUserLogin: (payload: Profile) => dispatch(Actions.UserLogin(payload))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
