import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { UserRegister } from "@app/actions/main";
import { IDispatchProps, IStateProps } from "@app/components/App/Register";
import { RegisterFormContainer } from "@app/form-containers/App/Register";
import { IStoreState } from "@app/types";
import { IProfile } from "@app/types/global";

const mapStateToProps = (state: IStoreState): IStateProps => {
    return { isRegistered: state.Main.isRegistered };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onUserRegister: (payload: IProfile) => dispatch(UserRegister(payload)),
    };
};

export const RegisterContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterFormContainer);
