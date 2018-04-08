import { connect, Dispatch } from 'react-redux';

import { Register, StateProps, DispatchProps, OwnProps } from '../../components/App/Register';
import { StoreState } from '../../types';
import { Actions } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Register);
