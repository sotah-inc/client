import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RegionToggle';
import { StoreState, Region } from '../../types';
import { SotahClientAction, RegionChange } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegion } = state;
  return { regions, currentRegion };
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {
    onRegionChange: (region: Region) => dispatch(RegionChange(region))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegionToggle);
