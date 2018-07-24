import { connect, Dispatch } from 'react-redux';

import { Listing, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/Listing';
import { StoreState } from '@app/types';
import { Pricelist } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeSelectedList, ChangeIsAddListDialogOpen, FetchGetPricelists } from '@app/actions/price-lists';
import { GetPricelistsOptions } from '@app/api/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm, profile, authLevel, fetchUserPreferencesLevel } = state.Main;
  const { pricelists, selectedList, isAddListDialogOpen, getPricelistsLevel } = state.PriceLists;
  return {
    pricelists,
    selectedList,
    currentRegion,
    currentRealm,
    isAddListDialogOpen,
    getPricelistsLevel,
    profile,
    authLevel,
    fetchUserPreferencesLevel
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeSelectedList: (selectedList: Pricelist) => dispatch(ChangeSelectedList(selectedList)),
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
    refreshPricelists: (opts: GetPricelistsOptions) => dispatch(FetchGetPricelists(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
