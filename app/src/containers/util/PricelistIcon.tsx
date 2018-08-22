import { connect } from "react-redux";

import { IOwnProps, IStateProps, PricelistIcon } from "@app/components/util/PricelistIcon";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items } = state.PriceLists;
    return { items };
};

export const PricelistIconContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(PricelistIcon);
