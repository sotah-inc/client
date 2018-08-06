import { connect, Dispatch } from 'react-redux';

import { SortToggle, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/SortToggle';
import { IStoreState } from '@app/types';
import { ISortChangeOptions } from '@app/types/auction';
import { Actions } from '@app/actions';
import { SortChange } from '@app/actions/auction';

const mapStateToProps = (state: IStoreState): StateProps => {
  const { sortDirection, sortKind } = state.Auction;
  return { currentSortDirection: sortDirection, currentSortKind: sortKind };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onChange: (payload: ISortChangeOptions) => dispatch(SortChange(payload))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SortToggle);
