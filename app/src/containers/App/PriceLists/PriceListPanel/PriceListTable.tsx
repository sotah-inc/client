import { connect } from "react-redux";

import { IStateProps, PriceListTable } from "@app/components/App/PriceLists/PriceListPanel/PriceListTable";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items } = state.PriceLists;
    return { items };
};

export const PriceListTableContainer = connect<IStateProps>(mapStateToProps)(PriceListTable);
