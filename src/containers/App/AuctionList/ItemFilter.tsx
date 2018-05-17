import { connect, Dispatch } from 'react-redux';

import { ItemFilter, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/ItemFilter';
import { StoreState } from '@app/types';
import { Item } from '@app/types/global';
import { Actions } from '@app/actions';
import { ItemFilterChange, FetchItems } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchItemsLevel, items, itemFilter, currentRegion, currentRealm } = state.Auction;
  return { fetchItemsLevel, items, itemFilter, currentRegion, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onItemFilterChange: (item: Item | null) => dispatch(ItemFilterChange(item)),
    refreshItems: (query: string) => dispatch(FetchItems(query))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemFilter);
