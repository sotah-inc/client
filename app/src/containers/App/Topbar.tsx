import { connect } from "react-redux";

import { IOwnProps, IStateProps, Topbar } from "@app/components/App/Topbar";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile, currentRealm, currentRegion } = state.Main;

    const user = profile === null ? null : profile.user;
    return { user, currentRealm, currentRegion };
};

export const TopbarContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Topbar);
