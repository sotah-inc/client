import { connect, Dispatch } from 'react-redux';

import { ItemFilter, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/ItemFilter';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ItemFilterChange, FetchItems } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchItemsLevel, items, itemFilter, currentRegion, currentRealm } = state.Auction;
  return { fetchItemsLevel, items, itemFilter, currentRegion, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onItemFilterChange: (itemName: string | null) => dispatch(ItemFilterChange(itemName)),
    refreshItems: (query: string) => dispatch(FetchItems(query))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemFilter);
