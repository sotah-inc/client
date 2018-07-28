import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { UpdatePricelistRequestOptions } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeIsLoginDialogOpen } from '@app/actions/main';
import {
  ChangeIsAddEntryDialogOpen,
  ChangeIsEditListDialogOpen,
  FetchUpdatePricelist
} from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { authLevel, profile } = state.Main;
  const { isAddEntryDialogOpen, updatePricelistLevel, selectedList, isEditListDialogOpen } = state.PriceLists;
  return { isAddEntryDialogOpen, authLevel, updatePricelistLevel, selectedList, profile, isEditListDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    updatePricelist: (opts: UpdatePricelistRequestOptions) => dispatch(FetchUpdatePricelist(opts)),
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
