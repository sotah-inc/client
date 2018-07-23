import { connect, Dispatch } from 'react-redux';

import { CreateListDialog, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/CreateListDialog';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ChangeIsAddListDialogOpen, FetchCreatePricelist } from '@app/actions/price-lists';
import { CreatePricelistRequest } from '@app/api/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm, profile } = state.Main;
  const { isAddListDialogOpen, createPricelistLevel, createPricelistErrors } = state.PriceLists;
  const { itemClasses } = state.Auction;

  return {
    isAddListDialogOpen,
    itemClasses,
    currentRegion,
    currentRealm,
    createPricelistLevel,
    createPricelistErrors,
    profile
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
    createPricelist: (token: string, request: CreatePricelistRequest) => dispatch(FetchCreatePricelist(token, request))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreateListDialog);
