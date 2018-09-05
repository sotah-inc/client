import * as React from "react";

import { Callout, Classes, H4, HTMLTable, Intent } from "@blueprintjs/core";

import { IOwnerItemsOwnership, IOwnerItemsOwnershipMap, IQueryOwnersByItemsOptions } from "@app/api/data";
import { Currency } from "@app/components/util";
import { IRealm, IRegion, OwnerName } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    itemsOwnershipMap: IOwnerItemsOwnershipMap;
    getItemsOwnershipLevel: FetchLevel;
}

export interface IDispatchProps {
    queryOwnersByItems: (opts: IQueryOwnersByItemsOptions) => void;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class CurrentSellersTable extends React.Component<Props> {
    public render() {
        const { itemsOwnershipMap: ownership } = this.props;

        const sortedOwnerNames = Object.keys(ownership).sort((a, b) => {
            const aValue = ownership[a];
            const bValue = ownership[b];

            if (aValue.owned_value === bValue.owned_value) {
                return a > b ? 1 : -1;
            }

            return aValue.owned_value > bValue.owned_value ? -1 : 1;
        });

        return (
            <>
                <H4>Current Sellers</H4>
                <Callout intent={Intent.PRIMARY}>This data is only a subset of each sellers auctions.</Callout>
                <HTMLTable
                    className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${Classes.SMALL} ownership-table`}
                >
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Value</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOwnerNames.map((owner, i) => this.renderOwnershipRow(i, owner, ownership[owner]))}
                    </tbody>
                </HTMLTable>
            </>
        );
    }

    private renderOwnershipRow(index: number, owner: OwnerName, ownership: IOwnerItemsOwnership) {
        return (
            <tr key={index}>
                <td>{owner}</td>
                <td>
                    <Currency amount={ownership.owned_value} />
                </td>
                <td>{ownership.owned_volume}</td>
            </tr>
        );
    }
}
