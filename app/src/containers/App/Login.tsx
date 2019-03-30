import { connect } from "react-redux";

import { ChangeIsLoginDialogOpen, UserLogin } from "@app/actions/main";
import { IDispatchProps, IStateProps } from "@app/components/App/Login";
import { LoginFormContainer } from "@app/form-containers/App/Login";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { isLoggedIn, isLoginDialogOpen } = state.Main;
    return { isLoggedIn, isLoginDialogOpen };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsLoginDialogOpen: ChangeIsLoginDialogOpen,
    onUserLogin: UserLogin,
};

export const LoginContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginFormContainer);
