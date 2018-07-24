import { connect, Dispatch } from 'react-redux';

import { Listing, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/Listing';
import { StoreState } from '@app/types';
import { Pricelist } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeSelectedList, ChangeIsAddListDialogOpen } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm } = state.Main;
  const { pricelists, selectedList, isAddListDialogOpen } = state.PriceLists;
  return { pricelists, selectedList, currentRegion, currentRealm, isAddListDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeSelectedList: (selectedList: Pricelist) => dispatch(ChangeSelectedList(selectedList)),
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
