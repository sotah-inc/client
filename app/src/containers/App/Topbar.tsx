import { connect } from "react-redux";

import { IOwnProps, IStateProps, Topbar } from "@app/components/App/Topbar";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const user = state.Main.profile === null ? null : state.Main.profile.user;
    return { user };
};

export const TopbarContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Topbar);
