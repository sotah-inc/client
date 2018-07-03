import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { PriceLists } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { ListCreateLevel, PriceList } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeListCreateLevel, ChangeSelectedList, ChangeIsAddListDialogOpen } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm } = state.Main;
  const { lists, listCreateLevel, selectedList, isAddListDialogOpen } = state.PriceLists;
  return { lists, listCreateLevel, selectedList, currentRegion, currentRealm, isAddListDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeCreateLevel: (createLevel: ListCreateLevel) => dispatch(ChangeListCreateLevel(createLevel)),
    changeSelectedList: (selectedList: PriceList) => dispatch(ChangeSelectedList(selectedList)),
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
