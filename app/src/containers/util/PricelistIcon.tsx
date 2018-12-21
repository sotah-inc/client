import { connect } from "react-redux";

import { IOwnProps, IStateProps, PricelistIcon } from "@app/components/util/PricelistIcon";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { items: auctionItems } = state.Auction;
    const { items: pricelistItems } = state.PriceLists;

    return { items: { ...auctionItems, ...pricelistItems } };
};

export const PricelistIconContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(PricelistIcon);
