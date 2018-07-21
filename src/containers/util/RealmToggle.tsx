import { connect, Dispatch } from 'react-redux';

import { RealmToggle, StateProps, DispatchProps, OwnProps } from '@app/components/util/RealmToggle';
import { StoreState } from '@app/types';
import { Realm } from '@app/types/global';
import { CreatePreferencesRequestBody, UpdatePreferencesRequestBody } from '@app/api/user';
import { Actions } from '@app/actions';
import { RealmChange, FetchUserPreferencesCreate, FetchUserPreferencesUpdate } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    realms,
    currentRealm,
    fetchRealmLevel,
    userPreferences,
    authLevel,
    profile,
    currentRegion
  } = state.Main;
  return {
    realms,
    currentRealm,
    fetchRealmLevel,
    userPreferences,
    authLevel,
    profile,
    currentRegion
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRealmChange: (realm: Realm) => dispatch(RealmChange(realm)),
    createUserPreferences: (
      token: string,
      body: CreatePreferencesRequestBody
    ) => dispatch(FetchUserPreferencesCreate(token, body)),
    updateUserPreferences: (
      token: string,
      body: UpdatePreferencesRequestBody
    ) => dispatch(FetchUserPreferencesUpdate(token, body))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RealmToggle);
