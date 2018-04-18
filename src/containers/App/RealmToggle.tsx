import { connect, Dispatch } from 'react-redux';

import { RealmToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RealmToggle';
import { StoreState } from '../../types';
import { Realm } from '../../types/main';
import { Actions } from '../../actions';
import { RealmChange } from '../../actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const { realms, currentRealm, fetchRealmLevel } = state.Main;
  return { realms, currentRealm, fetchRealmLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRealmChange: (realm: Realm) => dispatch(RealmChange(realm))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RealmToggle);
