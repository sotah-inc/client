import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { UpdatePricelistRequestOptions } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeIsLoginDialogOpen } from '@app/actions/main';
import {
  ChangeIsAddEntryDialogOpen,
  ChangeIsEditListDialogOpen,
  ChangeIsDeleteListDialogOpen,
  FetchUpdatePricelist,
  FetchDeletePricelist
} from '@app/actions/price-lists';
import { DeletePricelistRequestOptions } from '@app/api/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { authLevel, profile } = state.Main;
  const {
    isAddEntryDialogOpen,
    updatePricelistLevel,
    selectedList,
    isEditListDialogOpen,
    isDeleteListDialogOpen
  } = state.PriceLists;
  return {
    isAddEntryDialogOpen,
    authLevel,
    updatePricelistLevel,
    selectedList,
    profile,
    isEditListDialogOpen,
    isDeleteListDialogOpen
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    updatePricelist: (opts: UpdatePricelistRequestOptions) => dispatch(FetchUpdatePricelist(opts)),
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen)),
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
    deletePricelist: (opts: DeletePricelistRequestOptions) => dispatch(FetchDeletePricelist(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
