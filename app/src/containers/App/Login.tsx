import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsLoginDialogOpen, UserLogin } from "@app/actions/main";
import { DispatchProps, OwnProps, StateProps } from "@app/components/App/Login";
import Login from "@app/form-containers/App/Login";
import { IStoreState } from "@app/types";
import { IProfile } from "@app/types/global";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { isLoggedIn, isLoginDialogOpen } = state.Main;
    return { isLoggedIn, isLoginDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onUserLogin: (payload: IProfile) => dispatch(UserLogin(payload)),
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
