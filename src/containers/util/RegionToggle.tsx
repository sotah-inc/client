import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '@app/components/util/RegionToggle';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { CreatePreferencesRequestBody, UpdatePreferencesRequestBody } from '@app/api/user';
import { Actions } from '@app/actions';
import { RegionChange, FetchUserPreferencesCreate, FetchUserPreferencesUpdate } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    regions,
    currentRegion,
    fetchRegionLevel,
    userPreferences,
    authLevel,
    profile
  } = state.Main;
  return {
    regions,
    currentRegion,
    fetchRegionLevel,
    userPreferences,
    authLevel,
    profile
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRegionChange: (region: Region) => dispatch(RegionChange(region)),
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
)(RegionToggle);
