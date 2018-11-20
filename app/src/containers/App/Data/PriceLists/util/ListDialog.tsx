import { connect } from "react-redux";

import { IStateProps, ListDialog } from "@app/components/App/Data/PriceLists/util/ListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items } = state.PriceLists;
    return { items };
};

export const ListDialogContainer = connect<IStateProps>(mapStateToProps)(ListDialog);
