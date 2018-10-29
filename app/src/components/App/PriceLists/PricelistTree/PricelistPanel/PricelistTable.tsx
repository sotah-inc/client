import * as React from "react";

import { H2 } from "@blueprintjs/core";

import { IPricelistJson } from "@app/api-types/entities";
import { IItemsMap } from "@app/api-types/item";
import { IRealm, IRegion } from "@app/api-types/region";
import { CurrentPricesTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { CurrentSellersTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentSellersTable";
import { PricelistHistoryGraphContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/PricelistHistoryGraph";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";

export interface IStateProps {
    items: IItemsMap;
}

export interface IOwnProps {
    list: IPricelistJson;
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
