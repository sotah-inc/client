import { connect } from "react-redux";

import { CountChange } from "@app/actions/auction";
import { CountToggle, IDispatchProps, IStateProps } from "@app/components/App/Data/AuctionList/CountToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { auctionsPerPage } = state.Auction;
    return { auctionsPerPage };
};

const mapDispatchToProps: IDispatchProps = {
    onCountChange: CountChange,
};

export const CountToggleContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CountToggle);
