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

import { IGetOwnersOptions } from "@app/api/data";
import { FetchOwnersLevel } from "@app/types/auction";
import { IOwner, IRealm, IRegion, OwnerName } from "@app/types/global";

const OwnerFilterSuggest = Suggest.ofType<IOwner>();

export interface IStateProps {
    fetchOwnersLevel: FetchOwnersLevel;
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
        const { timerId } = this.state;
        const ownerFilterValue = e.target.value;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            this.props.refreshOwners({
                query: ownerFilterValue,
                realmSlug: this.props.currentRealm!.slug,
                regionName: this.props.currentRegion!.name,
            });
        }, 0.25 * 1000);
        this.setState({ ownerFilterValue, timerId: newTimerId });
    }

    public onFilterClear() {
        this.setState({ ownerFilterValue: "" });
        this.props.onOwnerFilterChange(null);
        this.props.refreshOwners({
            query: "",
            realmSlug: this.props.currentRealm!.slug,
            regionName: this.props.currentRegion!.name,
        });
    }

    public inputValueRenderer(v: IOwner) {
        return v.name;
    }

    public render() {
        const { fetchOwnersLevel, owners } = this.props;
        const { ownerFilterValue } = this.state;

        const canClearFilter = ownerFilterValue !== null && ownerFilterValue !== "";

        switch (fetchOwnersLevel) {
            case FetchOwnersLevel.success:
            case FetchOwnersLevel.refetching:
                return (
                    <ControlGroup>
                        <OwnerFilterSuggest
                            items={owners}
                            itemRenderer={this.itemRenderer}
                            itemListRenderer={this.itemListRenderer}
                            itemPredicate={this.itemPredicate}
                            onItemSelect={this.onFilterSet}
                            inputValueRenderer={this.inputValueRenderer}
                            inputProps={{ onChange: this.onFilterChange, value: ownerFilterValue }}
                        />
                        <Button
                            icon="filter-remove"
                            disabled={!canClearFilter}
                            text="Clear"
                            onClick={this.onFilterClear}
                        />
                    </ControlGroup>
                );
            case FetchOwnersLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case FetchOwnersLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case FetchOwnersLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }
}
