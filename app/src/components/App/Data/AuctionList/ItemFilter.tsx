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

import { IItem } from "@app/api-types/item";
import { IRealm, IRegion } from "@app/api-types/region";
import { FetchLevel } from "@app/types/main";

const ItemFilterSuggest = Suggest.ofType<IItem>();

export interface IStateProps {
    fetchItemsLevel: FetchLevel;
    items: IItem[];
    itemFilter: IItem | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

export interface IDispatchProps {
    onItemFilterChange: (item: IItem | null) => void;
    refreshItems: (query: string) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    itemFilterValue: string;
    timerId: NodeJS.Timer | null;
}>;

export class ItemFilter extends React.Component<Props, State> {
    public state: State = {
        itemFilterValue: "",
        timerId: null,
    };

    public itemPredicate: ItemPredicate<IItem> = (query: string, item: IItem) => {
        query = query.toLowerCase();
        return item.name.toLowerCase().indexOf(query) >= 0;
    };

    public itemRenderer: ItemRenderer<IItem> = (item: IItem, { handleClick, modifiers, index }: IItemRendererProps) => {
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
                text={item.name}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<IItem> = (params: IItemListRendererProps<IItem>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <H6>Select Item</H6>
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

    public onFilterSet(item: IItem) {
        this.setState({ itemFilterValue: item.name });
        this.props.onItemFilterChange(item);
    }

    public onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { refreshItems } = this.props;
        const { timerId } = this.state;
        const itemFilterValue = e.target.value;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => refreshItems(itemFilterValue), 0.25 * 1000);
        this.setState({ itemFilterValue, timerId: newTimerId });
    }

    public onFilterClear() {
        const { onItemFilterChange, refreshItems } = this.props;

        this.setState({ itemFilterValue: "" });
        onItemFilterChange(null);
        refreshItems("");
    }

    public render() {
        const { fetchItemsLevel, items } = this.props;
        const { itemFilterValue } = this.state;

        const canClearFilter = itemFilterValue !== null && itemFilterValue !== "";

        switch (fetchItemsLevel) {
            case FetchLevel.success:
            case FetchLevel.refetching:
                return (
                    <ControlGroup>
                        <ItemFilterSuggest
                            items={items}
                            itemRenderer={this.itemRenderer}
                            itemListRenderer={this.itemListRenderer}
                            itemPredicate={this.itemPredicate}
                            onItemSelect={this.onFilterSet}
                            inputValueRenderer={v => v.name}
                            inputProps={{
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.onFilterChange(e),
                                value: itemFilterValue,
                            }}
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
