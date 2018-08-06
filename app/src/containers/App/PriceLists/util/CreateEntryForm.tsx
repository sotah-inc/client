import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { DispatchProps, OwnProps, StateProps } from "@app/components/App/PriceLists/util/CreateEntryForm";
import CreateEntryForm from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateEntryForm);
