import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/Register';
import Register from '@app/form-containers/App/Register';
import { StoreState } from '@app/types';
import { Profile } from '@app/types/global';
import { Actions } from '@app/actions';
import { UserRegister } from '@app/actions/main';

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
