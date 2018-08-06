import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '@app/components/util/RegionToggle';
import { IStoreState } from '@app/types';
import { IRegion } from '@app/types/global';
import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from '@app/api/user';
import { Actions } from '@app/actions';
import { RegionChange, FetchUserPreferencesCreate, FetchUserPreferencesUpdate } from '@app/actions/main';

const mapStateToProps = (state: IStoreState): StateProps => {
  const {
    regions,
    currentRegion,
    fetchRegionLevel
  } = state.Main;
  return {
    regions,
    currentRegion,
    fetchRegionLevel
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
    createUserPreferences: (
      token: string,
      body: ICreatePreferencesRequestBody
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
