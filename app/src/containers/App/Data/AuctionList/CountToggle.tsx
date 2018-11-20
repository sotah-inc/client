import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { CountChange } from "@app/actions/auction";
import { CountToggle, IDispatchProps, IStateProps } from "@app/components/App/Data/AuctionList/CountToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { auctionsPerPage } = state.Auction;
    return { auctionsPerPage };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onCountChange: (count: number) => dispatch(CountChange(count)),
    };
};

export const CountToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CountToggle);
