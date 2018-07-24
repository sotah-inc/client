import { connect, Dispatch } from 'react-redux';

import { ActionBar, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/ActionBar';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ChangeIsAddListDialogOpen, ChangeIsAddEntryDialogOpen } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm } = state.Main;
  const { isAddListDialogOpen, isAddEntryDialogOpen, selectedList } = state.PriceLists;
  return {
    currentRegion,
    currentRealm,
    isAddListDialogOpen,
    isAddEntryDialogOpen,
    selectedList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ActionBar);
