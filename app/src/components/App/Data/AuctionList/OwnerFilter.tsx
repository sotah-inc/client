import * as React from "react";

import { Button, Classes, ControlGroup, H6, Intent, Menu, MenuItem, Spinner } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Suggest,
} from "@blueprintjs/select";

import { IOwner, OwnerName } from "@app/api-types/auction";
import { IRealm, IRegion } from "@app/api-types/region";
import { IGetOwnersOptions } from "@app/api/data";
import { FetchLevel } from "@app/types/main";

const OwnerFilterSuggest = Suggest.ofType<IOwner>();

export interface IStateProps {
    fetchOwnersLevel: FetchLevel;
    owners: IOwner[];
    ownerFilter: OwnerName | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

export interface IDispatchProps {
    onOwnerFilterChange: (ownerName: OwnerName | null) => void;
    refreshOwners: (opts: IGetOwnersOptions) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    ownerFilterValue: string;
    timerId: NodeJS.Timer | null;
}>;

export class OwnerFilter extends React.Component<Props, State> {
    public state: State = {
        ownerFilterValue: "",
        timerId: null,
    };

    public itemPredicate: ItemPredicate<IOwner> = (query: string, item: IOwner) => {
        query = query.toLowerCase();
        return item.name.toLowerCase().indexOf(query) >= 0;
    };

    public itemRenderer: ItemRenderer<IOwner> = (
        owner: IOwner,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const intent = Intent.NONE;

        return (
            <MenuItem
                key={index}
                intent={intent}
                className={modifiers.active ? Classes.ACTIVE : ""}
                onClick={handleClick}
                text={owner.name}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<IOwner> = (params: IItemListRendererProps<IOwner>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <H6>Select Owner</H6>
                    </li>
                    <li>
                        <em>No results found.</em>
                    </li>
                </Menu>
            );
        }

        return (
            <Menu ulRef={itemsParentRef}>
                <li>
                    <H6>Select Owner</H6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public onFilterSet(owner: IOwner) {
        this.setState({ ownerFilterValue: owner.name });
        this.props.onOwnerFilterChange(owner.name);
    }

    public onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { refreshOwners, currentRealm, currentRegion } = this.props;
        const { timerId } = this.state;
        const ownerFilterValue = e.target.value;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            refreshOwners({
                query: ownerFilterValue,
                realmSlug: currentRealm!.slug,
                regionName: currentRegion!.name,
            });
        }, 0.25 * 1000);
        this.setState({ ownerFilterValue, timerId: newTimerId });
    }

    public onFilterClear() {
        const { onOwnerFilterChange, refreshOwners, currentRealm, currentRegion } = this.props;
        this.setState({ ownerFilterValue: "" });
        onOwnerFilterChange(null);
        refreshOwners({
            query: "",
            realmSlug: currentRealm!.slug,
            regionName: currentRegion!.name,
        });
    }

    public render() {
        const { fetchOwnersLevel, owners } = this.props;
        const { ownerFilterValue } = this.state;

        const canClearFilter = ownerFilterValue !== null && ownerFilterValue !== "";

        switch (fetchOwnersLevel) {
            case FetchLevel.success:
            case FetchLevel.refetching:
                return (
                    <ControlGroup>
                        <OwnerFilterSuggest
                            items={owners}
                            itemRenderer={this.itemRenderer}
                            itemListRenderer={this.itemListRenderer}
                            itemPredicate={this.itemPredicate}
                            onItemSelect={v => this.onFilterSet(v)}
                            inputValueRenderer={v => v.name}
                            inputProps={{ onChange: e => this.onFilterChange(e), value: ownerFilterValue }}
                        />
                        <Button
                            icon="filter-remove"
                            disabled={!canClearFilter}
                            text="Clear"
                            onClick={() => this.onFilterClear()}
                        />
                    </ControlGroup>
                );
            case FetchLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case FetchLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case FetchLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }
}
