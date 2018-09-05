import * as React from "react";

import { Callout, Classes, H2, H4, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IOwnerItemsOwnership, IOwnerItemsOwnershipMap, queryOwnersByItems } from "@app/api/data";
import { Currency } from "@app/components/util";
import { CurrentPricesTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { PricelistHistoryGraphContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/PricelistHistoryGraph";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IRealm, IRegion, ItemsMap, OwnerName } from "@app/types/global";
import { GetPriceListLevel, IPricelist } from "@app/types/price-lists";
import { didRealmChange, didRegionChange } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IOwnProps>;

type State = Readonly<{
    getPriceListLevel: GetPriceListLevel;
    ownership: IOwnerItemsOwnershipMap;
}>;

export class PricelistTable extends React.Component<Props, State> {
    public state: State = {
        getPriceListLevel: GetPriceListLevel.initial,
        ownership: {},
    };

    public async componentDidMount() {
        const { region, realm } = this.props;
        if (region === null || realm === null) {
            return;
        }

        await this.reloadPricelistData();
    }

    public componentDidUpdate(prevProps: Props) {
        const { list, region, realm } = this.props;

        const shouldReloadPricelistData =
            this.props.list.pricelist_entries!.length !== prevProps.list.pricelist_entries!.length ||
            list.id !== prevProps.list.id ||
            didRegionChange(prevProps.region, region) ||
            didRealmChange(prevProps.realm, realm);
        if (shouldReloadPricelistData) {
            this.reloadPricelistData();
        }
    }

    public render() {
        const { getPriceListLevel } = this.state;

        switch (getPriceListLevel) {
            case GetPriceListLevel.failure:
                return (
                    <NonIdealState
                        title="Could not load price-lists"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                    />
                );
            case GetPriceListLevel.success:
                return this.renderTable();
            case GetPriceListLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
        }
    }

    private async reloadPricelistData() {
        const { list, region, realm } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);

        const ownersOwnership = await queryOwnersByItems({
            items: itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
        if (ownersOwnership === null) {
            this.setState({ getPriceListLevel: GetPriceListLevel.failure });

            return;
        }

        this.setState({
            getPriceListLevel: GetPriceListLevel.success,
            ownership: ownersOwnership.ownership,
        });
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

    private renderOwners() {
        const { ownership } = this.state;

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

    private renderTable() {
        const { list, region, realm } = this.props;

        return (
            <>
                <H2 className="pricelist-table-heading">
                    <PricelistIconContainer pricelist={list} />
                    {list.name}
                </H2>
                {<PricelistHistoryGraphContainer list={list} region={region} realm={realm} />}
                {<CurrentPricesTableContainer list={list} region={region} realm={realm} />}
                {this.renderOwners()}
            </>
        );
    }
}
