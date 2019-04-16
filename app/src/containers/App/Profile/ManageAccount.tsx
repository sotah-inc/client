import { connect } from "react-redux";

import { IOwnProps, IStateProps, ManageAccount } from "@app/components/App/Profile/ManageAccount";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    return { user: profile === null ? null : profile.user };
};

export const ManageAccountContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(ManageAccount);
