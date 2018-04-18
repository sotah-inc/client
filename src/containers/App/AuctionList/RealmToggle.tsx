import { connect, Dispatch } from 'react-redux';

import { RealmToggle, StateProps, DispatchProps, OwnProps } from 'components/App/AuctionList/RealmToggle';
import { StoreState } from 'types';
import { Realm } from 'types/global';
import { Actions } from 'actions';
import { RealmChange } from 'actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { realms, currentRealm, fetchRealmLevel } = state.Auction;
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
