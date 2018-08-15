import { connect } from "react-redux";

import { IOwnProps, IStateProps, ItemPopover } from "@app/components/util/ItemPopover";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { itemClasses } = state.Main;
    return { itemClasses };
};

export const ItemPopoverContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(ItemPopover);
