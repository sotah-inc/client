import { connect, Dispatch } from 'react-redux';

import { RealmList, StateProps, DispatchProps, OwnProps } from '../../components/App/RealmList';
import { StoreState } from '../../types';
import { Actions } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchRealmLevel, realms, currentRealm } = state;
  return { fetchRealmLevel, realms, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RealmList);
