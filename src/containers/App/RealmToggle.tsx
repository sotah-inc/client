import { connect, Dispatch } from 'react-redux';

import { RealmToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RealmToggle';
import { StoreState } from '../../types';
import { SotahClientAction } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { realms } = state;
  return { realms };
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RealmToggle);
