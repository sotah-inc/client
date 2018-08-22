import { connect } from "react-redux";

import {
    IStateProps,
    PricelistTable,
} from "@app/components/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items } = state.PriceLists;
    return { items };
};

export const PricelistTableContainer = connect<IStateProps>(mapStateToProps)(PricelistTable);
