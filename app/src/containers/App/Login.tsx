import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsLoginDialogOpen, UserLogin } from "@app/actions/main";
import { IDispatchProps, IStateProps } from "@app/components/App/Login";
import { LoginFormContainer } from "@app/form-containers/App/Login";
import { IStoreState } from "@app/types";
import { IProfile } from "@app/types/global";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { isLoggedIn, isLoginDialogOpen } = state.Main;
    return { isLoggedIn, isLoginDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        onUserLogin: (payload: IProfile) => dispatch(UserLogin(payload)),
    };
};

export const LoginContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(LoginFormContainer);
