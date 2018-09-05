import * as React from "react";

import { Callout, Classes, H2, H4, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import * as moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
    getPriceListHistory,
    IOwnerItemsOwnership,
    IOwnerItemsOwnershipMap,
    IPricelistHistoryMap,
    ITimestampPricesMap,
    queryOwnersByItems,
} from "@app/api/data";
import { Currency } from "@app/components/util";
import { CurrentPricesTableContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel/PricelistTable/CurrentPricesTable";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IRealm, IRegion, ItemId, ItemsMap, OwnerName } from "@app/types/global";
import { GetPriceListLevel, IPricelist } from "@app/types/price-lists";
import { currencyToText, didRealmChange, didRegionChange, getColor, unixTimestampToText } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

interface ILineItem {
    name: number;
    [key: string]: number;
}

type Props = Readonly<IStateProps & IOwnProps>;

type State = Readonly<{
    getPriceListLevel: GetPriceListLevel;
    pricelistHistoryMap: IPricelistHistoryMap;
    ownership: IOwnerItemsOwnershipMap;
}>;

export class PricelistTable extends React.Component<Props, State> {
    public state: State = {
        getPriceListLevel: GetPriceListLevel.initial,
        ownership: {},
        pricelistHistoryMap: {},
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

        const pricelistHistoryData = await getPriceListHistory({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
        if (pricelistHistoryData === null) {
            this.setState({ getPriceListLevel: GetPriceListLevel.failure });

            return;
        }

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
            pricelistHistoryMap: { ...pricelistHistoryData.history },
        });
    }

    private getItem(itemId: ItemId) {
        const { items } = this.props;

        if (itemId in items) {
            return items[itemId];
        }

        return null;
    }

    private renderLine(index: number, itemId: ItemId) {
        let name: string = itemId.toString();
        const item = this.getItem(itemId);
        if (item !== null) {
            name = item.name;
        }

        return (
            <Line
                key={index}
                name={name}
                dataKey={`${itemId}_buyout`}
                stroke={getColor(index)}
                dot={false}
                animationEasing={"ease-in-out"}
                animationDuration={500}
            />
        );
    }

    private renderLines(data: IPricelistHistoryMap) {
        return Object.keys(data).map((itemIdKey: string, index: number) => this.renderLine(index, Number(itemIdKey)));
    }

    private renderGraph() {
        const { pricelistHistoryMap } = this.state;

        const data: ILineItem[] = Object.keys(pricelistHistoryMap).reduce(
            (dataPreviousValue: ILineItem[], itemIdKey: string) => {
                const itemPricelistHistory: ITimestampPricesMap = pricelistHistoryMap[itemIdKey];
                const itemId = Number(itemIdKey);

                return Object.keys(itemPricelistHistory).reduce((previousValue: ILineItem[], unixTimestampKey) => {
                    const unixTimestamp = Number(unixTimestampKey);
                    const prices = itemPricelistHistory[unixTimestamp];

                    previousValue.push({ name: unixTimestamp, [`${itemId}_buyout`]: prices.buyout / 10 / 10 });

                    return previousValue;
                }, dataPreviousValue);
            },
            [],
        );

        const twoWeeksAgoDate = moment().subtract(14, "days");
        const roundedTwoWeeksAgoDate = moment()
            .subtract(16, "days")
            .subtract(twoWeeksAgoDate.hours(), "hours")
            .subtract(twoWeeksAgoDate.minutes(), "minutes")
            .subtract(twoWeeksAgoDate.seconds(), "seconds");
        const nowDate = moment().add(1, "days");
        const roundedNowDate = moment()
            .add(1, "days")
            .subtract(nowDate.hours(), "hours")
            .subtract(nowDate.minutes(), "minutes")
            .subtract(nowDate.seconds(), "seconds")
            .add(12, "hours");

        const ticks = Array.from(Array(9)).map((_, i) => {
            return roundedTwoWeeksAgoDate.unix() + i * 60 * 60 * 24 * 2;
        });

        return (
            <>
                <H4>Price History</H4>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid vertical={false} strokeWidth={0.25} strokeOpacity={0.25} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={unixTimestampToText}
                            domain={[roundedTwoWeeksAgoDate.unix(), roundedNowDate.unix()]}
                            type="number"
                            ticks={ticks}
                            tick={{ fill: "#fff" }}
                        />
                        <YAxis
                            tickFormatter={v => currencyToText(v * 10 * 10)}
                            domain={[
                                dataMin => {
                                    const result = Math.pow(10, Math.floor(Math.log10(dataMin)));
                                    if (result === 0) {
                                        return 10;
                                    }

                                    return result;
                                },
                                dataMax => Math.pow(10, Math.ceil(Math.log10(dataMax)) + 1),
                            ]}
                            tick={{ fill: "#fff" }}
                            scale="log"
                            allowDataOverflow={true}
                            mirror={true}
                        />
                        <Legend />
                        {this.renderLines(pricelistHistoryMap)}
                    </LineChart>
                </ResponsiveContainer>
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
                {this.renderGraph()}
                {<CurrentPricesTableContainer list={list} region={region} realm={realm} />}
                {this.renderOwners()}
            </>
        );
    }
}
