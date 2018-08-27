import * as React from "react";

import { Callout, Card, Classes, H5, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IGetUnmetDemandRequestOptions } from "@app/api/price-lists";
import { ProfessionIcon } from "@app/components/util/ProfessionIcon";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import {
    IExpansion,
    IProfession,
    IProfessionPricelist,
    IRealm,
    IRegion,
    ItemId,
    ItemsMap,
    RealmPopulation,
} from "@app/types/global";
import { GetUnmetDemandLevel, IPricelist, IPricelistEntry } from "@app/types/price-lists";
import { didRealmChange, getPrimaryExpansion, qualityToColorClass } from "@app/util";

export interface IStateProps {
    expansions: IExpansion[];
    unmetDemandItemIds: ItemId[];
    unmetDemandProfessionPricelists: IProfessionPricelist[];
    professions: IProfession[];
    getUnmetDemandLevel: GetUnmetDemandLevel;
    items: ItemsMap;
}

export interface IDispatchProps {
    refreshUnmetDemand: (opts: IGetUnmetDemandRequestOptions) => void;
}

export interface IOwnProps {
    realm: IRealm;
    region: IRegion;
}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

interface ICollapsedResultItem {
    entry: IPricelistEntry;
    professionPricelist: IProfessionPricelist;
}

export class RealmSummaryPanel extends React.Component<Props> {
    public componentDidMount() {
        const { refreshUnmetDemand, region, realm, expansions } = this.props;

        refreshUnmetDemand({
            expansion: getPrimaryExpansion(expansions).name,
            realm: realm.slug,
            region: region.name,
        });
    }

    public componentDidUpdate(prevProps: Props) {
        const { refreshUnmetDemand, region, realm, expansions } = this.props;

        if (didRealmChange(prevProps.realm, realm)) {
            refreshUnmetDemand({
                expansion: getPrimaryExpansion(expansions).name,
                realm: realm.slug,
                region: region.name,
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
                        {region.name.toUpperCase()}-{realm.name}
                        is a <em>{population} population</em> realm
                    </p>
                </Callout>
                <Card>
                    <H5>Unmet Demand for {getPrimaryExpansion(expansions).label} Professions</H5>
                    {this.renderUnmetDemand()}
                </Card>
            </>
        );
    }

    private renderUnmetDemand() {
        const { getUnmetDemandLevel } = this.props;

        switch (getUnmetDemandLevel) {
            case GetUnmetDemandLevel.success:
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
        const { realm, region, unmetDemandProfessionPricelists, unmetDemandItemIds } = this.props;

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
                <td>{this.renderPricelistCell(professionPricelist.pricelist!)}</td>
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

    private renderPricelistCell(pricelist: IPricelist) {
        return (
            <>
                <PricelistIconContainer pricelist={pricelist} /> {pricelist.name}
            </>
        );
    }
}
