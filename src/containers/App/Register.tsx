import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '../../components/App/Register';
import Register from '../../form-containers/App/Register';
import { StoreState } from '../../types';
import { Profile } from '../../types/main';
import { Actions } from '../../actions';
import { UserRegister } from '../../actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  return { isRegistered: state.Main.isRegistered };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onUserRegister: (payload: Profile) => dispatch(UserRegister(payload))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Register);
