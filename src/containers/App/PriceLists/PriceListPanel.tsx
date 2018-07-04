import { connect, Dispatch } from 'react-redux';

import { PriceListPanel, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/PriceListPanel';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ChangeIsAddEntryDialogOpen } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm } = state.Main;
  const { isAddEntryDialogOpen } = state.PriceLists;
  return { currentRegion, currentRealm, isAddEntryDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceListPanel);
