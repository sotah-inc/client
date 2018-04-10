import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '../../components/App/Register';
import Register from '../../form-containers/App/Register';
import { StoreState, User } from '../../types';
import { Actions, UserRegister } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return { isRegistered: state.isRegistered };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onUserRegister: (user: User) => dispatch(UserRegister(user))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Register);
