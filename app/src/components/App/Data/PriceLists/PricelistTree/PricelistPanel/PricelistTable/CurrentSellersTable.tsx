import * as React from "react";

import { Callout, Classes, H4, HTMLTable, Intent, Navbar, NavbarGroup, Spinner } from "@blueprintjs/core";

import { OwnerName } from "@app/api-types/auction";
import { IQueryOwnerItem, IQueryOwnerItemsMap } from "@app/api-types/contracts/data";
import { IPricelistJson } from "@app/api-types/entities";
import { IRealm, IRegion } from "@app/api-types/region";
import { IQueryOwnersByItemsOptions } from "@app/api/data";
import { Currency, Pagination } from "@app/components/util";
import { FetchLevel } from "@app/types/main";
import { didRealmChange, didRegionChange } from "@app/util";

export interface IStateProps {
    itemsOwnershipMap: IQueryOwnerItemsMap;
    getItemsOwnershipLevel: FetchLevel;
    fetchRealmLevel: FetchLevel;
}

export interface IDispatchProps {
    queryOwnersByItems: (opts: IQueryOwnersByItemsOptions) => void;
}

export interface IOwnProps {
    list: IPricelistJson;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

type State = Readonly<{
    currentPage: number;
}>;

const resultsPerPage = 5;

export class CurrentSellersTable extends React.Component<Props & State> {
    public state: State = { currentPage: 0 };

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
        const { queryOwnersByItems, region, realm, getItemsOwnershipLevel, list, fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.success:
                break;
            default:
                return;
        }

        switch (getItemsOwnershipLevel) {
            case FetchLevel.success:
                break;
            default:
                return;
        }

        const previousItemIds = prevProps.list.pricelist_entries.map(v => v.item_id);
        const itemIds = list.pricelist_entries.map(v => v.item_id);
        const newItemIds = itemIds.filter(v => previousItemIds.indexOf(v) === -1);
        const missingItemIds = previousItemIds.filter(v => itemIds.indexOf(v) === -1);

        const shouldReloadPrices =
            didRegionChange(prevProps.region, region) ||
            didRealmChange(prevProps.realm, realm) ||
            prevProps.list.id !== list.id ||
            newItemIds.length > 0 ||
            missingItemIds.length > 0;
        if (!shouldReloadPrices) {
            return;
        }

        queryOwnersByItems({
            items: itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
    }

    public render() {
        return (
            <>
                <H4>Current Sellers</H4>
                {this.renderContent()}
            </>
        );
    }

    private getPageCount() {
        const { itemsOwnershipMap } = this.props;

        const totalResults = Object.keys(itemsOwnershipMap).length;

        let pageCount = 0;
        if (totalResults > 0) {
            pageCount = totalResults / resultsPerPage - 1;
            const remainder = totalResults % resultsPerPage;
            if (remainder > 0) {
                pageCount = (totalResults - remainder) / resultsPerPage;
            }
        }

        return pageCount;
    }

    private renderContent() {
        const { fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.prompted:
            case FetchLevel.fetching:
            case FetchLevel.refetching:
                return <Spinner intent={Intent.PRIMARY} />;
            case FetchLevel.failure:
                return <Spinner intent={Intent.DANGER} value={1} />;
            case FetchLevel.success:
                return this.renderContentWithRealms();
            case FetchLevel.initial:
            default:
                return <Spinner intent={Intent.NONE} value={0} />;
        }
    }

    private renderContentWithRealms() {
        const { getItemsOwnershipLevel, itemsOwnershipMap: ownership } = this.props;
        const { currentPage } = this.state;

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

        let sortedOwnerNames = Object.keys(ownership).sort((a, b) => {
            const aValue = ownership[a];
            const bValue = ownership[b];

            if (aValue.owned_value === bValue.owned_value) {
                return a > b ? 1 : -1;
            }

            return aValue.owned_value > bValue.owned_value ? -1 : 1;
        });
        sortedOwnerNames = sortedOwnerNames.slice(currentPage * resultsPerPage, (currentPage + 1) * resultsPerPage);

        const pageCount = this.getPageCount();

        return (
            <>
                <Callout intent={Intent.PRIMARY}>
                    This data is only a subset of each sellers auctions relevant to the current list.
                </Callout>
                <Navbar style={{ marginTop: "10px" }}>
                    <NavbarGroup>
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={v => this.setState({ currentPage: v })}
                            pageCount={pageCount}
                            pagesShown={5}
                        />
                    </NavbarGroup>
                </Navbar>
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
                <p style={{ textAlign: "center" }}>
                    Page {currentPage + 1} of {pageCount + 1}
                </p>
            </>
        );
    }

    private renderOwnershipRow(index: number, owner: OwnerName, ownership: IQueryOwnerItem) {
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
