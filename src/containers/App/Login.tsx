import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '../../components/App/Login';
import Login from '../../form-containers/App/Login';
import { StoreState } from '../../types';
import { Profile } from '../../types/main';
import { Actions } from '../../actions';
import { UserLogin } from '../../actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  return { isLoggedIn: state.Main.isLoggedIn };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onUserLogin: (payload: Profile) => dispatch(UserLogin(payload))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
