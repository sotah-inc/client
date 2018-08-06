import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { UserRegister } from "@app/actions/main";
import { DispatchProps, OwnProps, StateProps } from "@app/components/App/Register";
import Register from "@app/form-containers/App/Register";
import { IStoreState } from "@app/types";
import { IProfile } from "@app/types/global";

const mapStateToProps = (state: IStoreState): StateProps => {
    return { isRegistered: state.Main.isRegistered };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        onUserRegister: (payload: IProfile) => dispatch(UserRegister(payload)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Register);
