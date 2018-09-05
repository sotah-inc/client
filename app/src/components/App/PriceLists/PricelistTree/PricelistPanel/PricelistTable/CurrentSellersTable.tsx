import * as React from "react";

import { Callout, Classes, H4, HTMLTable, Intent, Spinner } from "@blueprintjs/core";

import { IOwnerItemsOwnership, IOwnerItemsOwnershipMap, IQueryOwnersByItemsOptions } from "@app/api/data";
import { Currency } from "@app/components/util";
import { IRealm, IRegion, OwnerName } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { IPricelist } from "@app/types/price-lists";
import { didRealmChange, didRegionChange } from "@app/util";

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
    public componentDidMount() {
        const { region, realm, queryOwnersByItems, list } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);

        queryOwnersByItems({
            items: itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
    }

    public componentDidUpdate(prevProps: Props) {
        const { queryOwnersByItems, region, realm, getItemsOwnershipLevel, list } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);

        switch (getItemsOwnershipLevel) {
            case FetchLevel.success:
                const shouldReloadPrices =
                    didRegionChange(prevProps.region, region) ||
                    didRealmChange(prevProps.realm, realm) ||
                    prevProps.list.id !== list.id;
                if (shouldReloadPrices) {
                    queryOwnersByItems({
                        items: itemIds,
                        realmSlug: realm.slug,
                        regionName: region.name,
                    });
                }
            default:
                break;
        }
    }

    public render() {
        return (
            <>
                <H4>Current Sellers</H4>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        const { getItemsOwnershipLevel, itemsOwnershipMap: ownership } = this.props;

        switch (getItemsOwnershipLevel) {
            case FetchLevel.fetching:
                return <Spinner intent={Intent.PRIMARY} />;
            case FetchLevel.failure:
                return <Spinner intent={Intent.DANGER} value={1} />;
            case FetchLevel.success:
                break;
            case FetchLevel.initial:
            default:
                return <Spinner intent={Intent.NONE} value={1} />;
        }

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
