import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { DispatchProps, ItemPopover, OwnProps, StateProps } from "@app/components/util/ItemPopover";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { itemClasses } = state.Auction;
    return { itemClasses };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ItemPopover);
