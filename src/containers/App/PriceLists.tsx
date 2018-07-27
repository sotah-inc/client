import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ChangeIsLoginDialogOpen } from '@app/actions/main';
import {
  ChangeIsAddEntryDialogOpen,
  ChangeIsEditListDialogOpen,
  FetchUpdatePricelist
} from '@app/actions/price-lists';
import { UpdatePricelistRequest } from '@app/api/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { authLevel, profile } = state.Main;
  const { isAddEntryDialogOpen, updatePricelistLevel, selectedList, isEditListDialogOpen } = state.PriceLists;
  return { isAddEntryDialogOpen, authLevel, updatePricelistLevel, selectedList, profile, isEditListDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    updatePricelist: (request: UpdatePricelistRequest) => dispatch(FetchUpdatePricelist(request)),
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
