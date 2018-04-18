import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/Login';
import Login from '@app/form-containers/App/Login';
import { StoreState } from '@app/types';
import { Profile } from '@app/types/global';
import { Actions } from '@app/actions';
import { UserLogin } from '@app/actions/main';

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
