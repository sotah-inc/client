import * as React from "react";

import { IPricelistJson } from "@app/api-types/entities";
import { IItemsMap } from "@app/api-types/item";
import { getItemIconUrl } from "@app/util";

export interface IStateProps {
    items: IItemsMap;
}

export interface IOwnProps {
    pricelist: IPricelistJson;
}

type Props = Readonly<IStateProps & IOwnProps>;

export class PricelistIcon extends React.Component<Props> {
    public render() {
        const { items, pricelist } = this.props;

        if (!pricelist.pricelist_entries) {
            return null;
        }

        if (pricelist.pricelist_entries.length === 0) {
            return null;
        }

        const itemId = pricelist.pricelist_entries[0].item_id;
        if (!(itemId in items)) {
            return null;
        }

        const itemIconUrl = getItemIconUrl(items[itemId]);
        if (itemIconUrl === null) {
            return null;
        }

        return <img src={itemIconUrl} className="item-icon" />;
    }
}
