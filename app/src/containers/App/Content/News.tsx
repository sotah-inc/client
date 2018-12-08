import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsRegisterDialogOpen } from "@app/actions/main";
import { IDispatchProps, IOwnProps, IStateProps, News } from "@app/components/App/Content/News";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, authLevel } = state.Main;
    return { currentRegion, authLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsRegisterDialogOpen: (payload: boolean) => dispatch(ChangeIsRegisterDialogOpen(payload)),
    };
};

export const NewsContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(News);
