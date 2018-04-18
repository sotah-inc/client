import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RegionToggle';
import { StoreState } from '../../types';
import { Region } from '../../types/main';
import { Actions } from '../../actions';
import { RegionChange } from '../../actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegion, fetchRegionLevel } = state.Main;
  return { regions, currentRegion, fetchRegionLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRegionChange: (region: Region) => dispatch(RegionChange(region))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegionToggle);
