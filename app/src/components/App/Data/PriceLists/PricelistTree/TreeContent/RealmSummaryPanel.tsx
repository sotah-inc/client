import * as React from "react";

import { Callout, Card, Classes, H5, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IProfessionNode } from "@app/actions/price-lists";
import { IPricelistEntryJson, IPricelistJson, IProfessionPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap, ItemId } from "@app/api-types/item";
import { IProfession, ProfessionName } from "@app/api-types/profession";
import { IRealm, IRegion, RealmPopulation } from "@app/api-types/region";
import { IGetUnmetDemandOptions } from "@app/api/price-lists";
import { ProfessionIcon } from "@app/components/util/ProfessionIcon";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { FetchLevel } from "@app/types/main";
import { didRealmChange, getPrimaryExpansion, qualityToColorClass } from "@app/util";

export interface IStateProps {
    expansions: IExpansion[];
    unmetDemandItemIds: ItemId[];
    unmetDemandProfessionPricelists: IProfessionPricelistJson[];
    professions: IProfession[];
    getUnmetDemandLevel: FetchLevel;
    items: IItemsMap;
}

export interface IDispatchProps {
    refreshUnmetDemand: (opts: IGetUnmetDemandOptions) => void;
    navigateProfessionNode: (node: IProfessionNode) => void;
}

export interface IOwnProps {
    realm: IRealm;
    region: IRegion;
}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

interface ICollapsedResultItem {
    entry: IPricelistEntryJson;
    professionPricelist: IProfessionPricelistJson;
}

export class RealmSummaryPanel extends React.Component<Props> {
    public componentDidMount() {
        const { refreshUnmetDemand, region, realm, expansions } = this.props;

        refreshUnmetDemand({
            realm: realm.slug,
            region: region.name,
            request: {
                expansion: getPrimaryExpansion(expansions).name,
            },
        });
    }

    public componentDidUpdate(prevProps: Props) {
        const { refreshUnmetDemand, region, realm, expansions } = this.props;

        if (didRealmChange(prevProps.realm, realm)) {
            refreshUnmetDemand({
                realm: realm.slug,
                region: region.name,
                request: {
                    expansion: getPrimaryExpansion(expansions).name,
                },
            });
        }
    }

    public render() {
        const { realm, region, expansions } = this.props;

        let population = realm.population;
        if (population === RealmPopulation.na) {
            population = RealmPopulation.high;
        }

        return (
            <>
                <Callout style={{ marginBottom: "10px" }}>
                    <H5>Summary</H5>
                    <p style={{ marginBottom: 0 }}>
                        {region.name.toUpperCase()}-{realm.name} is a <em>{population} population</em> realm
                    </p>
                </Callout>
                <Card>
                    <H5>Unmet Demand for {getPrimaryExpansion(expansions).label} Professions</H5>
                    {this.renderUnmetDemand()}
                </Card>
            </>
        );
    }

    public onPricelistClick(pricelist: IPricelistJson, professionName: ProfessionName) {
        const { expansions, professions, navigateProfessionNode } = this.props;

        const profession: IProfession = professions.reduce((currentValue, v) => {
            if (v.name === professionName) {
                return v;
            }

            return currentValue;
        }, professions[0]);

        navigateProfessionNode({ expansion: getPrimaryExpansion(expansions), pricelist, profession });
    }

    private renderUnmetDemand() {
        const { getUnmetDemandLevel } = this.props;

        switch (getUnmetDemandLevel) {
            case FetchLevel.success:
                return this.renderUnmetDemandSuccess();
            default:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
        }
    }

    private renderUnmetDemandSuccess() {
        const { realm, region, unmetDemandProfessionPricelists, unmetDemandItemIds, items } = this.props;

        let collapsedResult: ICollapsedResultItem[] = unmetDemandProfessionPricelists.reduce(
            (outer: ICollapsedResultItem[], professionPricelist) => [
                ...outer,
                ...professionPricelist.pricelist!.pricelist_entries!.reduce(
                    (inner: ICollapsedResultItem[], entry) => [...inner, { professionPricelist, entry }],
                    [],
                ),
            ],
            [],
        );
        collapsedResult = collapsedResult.filter(v => unmetDemandItemIds.indexOf(v.entry.item_id) > -1);
        collapsedResult = collapsedResult.sort((a, b) => {
            if (a.professionPricelist.name !== b.professionPricelist.name) {
                return a.professionPricelist.name > b.professionPricelist.name ? 1 : -1;
            }

            if (a.professionPricelist.pricelist!.name !== b.professionPricelist.pricelist!.name) {
                return a.professionPricelist.pricelist!.name > b.professionPricelist.pricelist!.name ? 1 : -1;
            }

            const aItemValue: string =
                a.entry.item_id in items ? items[a.entry.item_id].name : a.entry.item_id.toString();
            const bItemValue: string =
                b.entry.item_id in items ? items[b.entry.item_id].name : b.entry.item_id.toString();
            if (aItemValue !== bItemValue) {
                return aItemValue > bItemValue ? 1 : -1;
            }

            return 0;
        });

        if (collapsedResult.length === 0) {
            return (
                <Callout intent={Intent.SUCCESS}>
                    All pricelists are fulfilled for {region.name.toUpperCase()}-{realm.name}!
                </Callout>
            );
        }

        return (
            <>
                <Callout intent={Intent.PRIMARY}>
                    These items have <strong>0</strong> auctions posted on {region.name.toUpperCase()}-{realm.name}.
                </Callout>
                <HTMLTable
                    className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${
                        Classes.SMALL
                    } unmet-items-table`}
                >
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Profession</th>
                            <th>Pricelist</th>
                        </tr>
                    </thead>
                    <tbody>{collapsedResult.map((v, i) => this.renderItemRow(i, v))}</tbody>
                </HTMLTable>
            </>
        );
    }

    private renderItemRow(index: number, resultItem: ICollapsedResultItem) {
        const { items, professions } = this.props;

        const { professionPricelist, entry } = resultItem;
        const profession: IProfession | null = professions.reduce((currentValue: IProfession | null, v) => {
            if (currentValue !== null) {
                return currentValue;
            }

            return v.name === professionPricelist.name ? v : null;
        }, null);
        const { item_id } = entry;
        const item = items[item_id];

        return (
            <tr key={index}>
                <td className={qualityToColorClass(item.quality)}>
                    <ItemPopoverContainer item={item} />
                </td>
                <td>{this.renderProfession(profession)}</td>
                <td>{this.renderPricelistCell(professionPricelist.pricelist!, professionPricelist.name)}</td>
            </tr>
        );
    }

    private renderProfession(profession: IProfession | null) {
        if (profession === null) {
            return null;
        }

        return (
            <>
                <ProfessionIcon profession={profession} /> {profession.label}
            </>
        );
    }

    private renderPricelistCell(pricelist: IPricelistJson, profession: ProfessionName) {
        return (
            <>
                <PricelistIconContainer pricelist={pricelist} />
                &nbsp;
                <a onClick={() => this.onPricelistClick(pricelist, profession)}>{pricelist.name}</a>
            </>
        );
    }
}
