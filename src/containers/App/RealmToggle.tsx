import { connect, Dispatch } from 'react-redux';

import { RealmToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RealmToggle';
import { StoreState, Realm } from '../../types';
import { SotahClientAction, RealmChange } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { realms, currentRealm } = state;
  return { realms, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {
    onRealmChange: (realm: Realm) => dispatch(RealmChange(realm))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RealmToggle);
