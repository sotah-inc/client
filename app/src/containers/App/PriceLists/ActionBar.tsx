import { connect, Dispatch } from 'react-redux';

import { ActionBar, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/ActionBar';
import { IStoreState } from '@app/types';
import { Actions } from '@app/actions';
import {
  ChangeIsAddListDialogOpen,
  ChangeIsAddEntryDialogOpen,
  ChangeIsEditListDialogOpen,
  ChangeIsDeleteListDialogOpen
} from '@app/actions/price-lists';

const mapStateToProps = (state: IStoreState): StateProps => {
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
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen)),
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ActionBar);
