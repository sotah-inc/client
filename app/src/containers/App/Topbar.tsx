import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { DispatchProps, OwnProps, StateProps, Topbar } from "@app/components/App/Topbar";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
    const user = state.Main.profile === null ? null : state.Main.profile.user;
    return { user };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Topbar);
