import { connect } from "react-redux";

import { IOwnProps, IStateProps, Profile } from "@app/components/App/Profile";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    return { user: profile === null ? null : profile.user };
};

export const ProfileContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Profile);
