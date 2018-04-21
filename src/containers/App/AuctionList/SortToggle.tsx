import { connect, Dispatch } from 'react-redux';

import { SortToggle, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/SortToggle';
import { StoreState } from '@app/types';
import { SortChangeOptions } from '@app/types/auction';
import { Actions } from '@app/actions';
import { SortChange } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { sortDirection, sortKind } = state.Auction;
  return { currentSortDirection: sortDirection, currentSortKind: sortKind };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onChange: (payload: SortChangeOptions) => dispatch(SortChange(payload))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SortToggle);
