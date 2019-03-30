import { connect } from "react-redux";

import { ChangeIsRegisterDialogOpen, UserRegister } from "@app/actions/main";
import { IDispatchProps, IStateProps } from "@app/components/App/Register";
import { RegisterFormContainer } from "@app/form-containers/App/Register";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { isRegisterDialogOpen, isRegistered } = state.Main;
    return { isRegisterDialogOpen, isRegistered };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsRegisterDialogOpen: ChangeIsRegisterDialogOpen,
    onUserRegister: UserRegister,
};

export const RegisterContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterFormContainer);
