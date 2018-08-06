import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { CountChange } from "@app/actions/auction";
import { CountToggle, DispatchProps, OwnProps, StateProps } from "@app/components/App/AuctionList/CountToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { auctionsPerPage } = state.Auction;
    return { auctionsPerPage };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onCountChange: (count: number) => dispatch(CountChange(count)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CountToggle);
