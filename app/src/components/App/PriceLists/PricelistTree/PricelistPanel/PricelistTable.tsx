import * as React from "react";

import { H2 } from "@blueprintjs/core";

import { CurrentPricesTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { CurrentSellersTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentSellersTable";
import { PricelistHistoryGraphContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/PricelistHistoryGraph";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IRealm, IRegion, ItemsMap } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    items: ItemsMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IOwnProps>;

export class PricelistTable extends React.Component<Props> {
    public render() {
        const { list, region, realm } = this.props;

        return (
            <>
                <H2 className="pricelist-table-heading">
                    <PricelistIconContainer pricelist={list} />
                    {list.name}
                </H2>
                {<PricelistHistoryGraphContainer list={list} region={region} realm={realm} />}
                {<CurrentPricesTableContainer list={list} region={region} realm={realm} />}
                {<CurrentSellersTableContainer list={list} region={region} realm={realm} />}
            </>
        );
    }
}
