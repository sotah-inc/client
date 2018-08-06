import { Button, ControlGroup, Intent, Menu, MenuItem, Spinner } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Suggest,
} from "@blueprintjs/select";
import * as React from "react";

import { FetchItemsLevel } from "@app/types/auction";
import { IRealm, IRegion, Item } from "@app/types/global";

const ItemFilterSuggest = Suggest.ofType<Item>();

export interface StateProps {
    fetchItemsLevel: FetchItemsLevel;
    items: Item[];
    itemFilter: Item | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

export interface DispatchProps {
    onItemFilterChange: (item: Item | null) => void;
    refreshItems: (query: string) => void;
}

export interface OwnProps {}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
    itemFilterValue: string;
    timerId: NodeJS.Timer | null;
}>;

export class ItemFilter extends React.Component<Props, State> {
    public state: State = {
        itemFilterValue: "",
        timerId: null,
    };

    public itemPredicate: ItemPredicate<Item> = (query: string, item: Item) => {
        query = query.toLowerCase();
        return item.name.toLowerCase().indexOf(query) >= 0;
    };

    public itemRenderer: ItemRenderer<Item> = (item: Item, { handleClick, modifiers, index }: IItemRendererProps) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const intent = Intent.NONE;

        return (
            <MenuItem
                key={index}
                intent={intent}
                className={modifiers.active ? "pt-active" : ""}
                onClick={handleClick}
                text={item.name}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<Item> = (params: IItemListRendererProps<Item>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <h6>Select Item</h6>
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
                    <h6>Select Owner</h6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public onFilterSet(item: Item) {
        this.setState({ itemFilterValue: item.name });
        this.props.onItemFilterChange(item);
    }

    public onFilterChange(itemFilterValue: string) {
        const { timerId } = this.state;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            this.props.refreshItems(itemFilterValue);
        }, 0.25 * 1000);
        this.setState({ itemFilterValue, timerId: newTimerId });
    }

    public onFilterClear() {
        this.setState({ itemFilterValue: "" });
        this.props.onItemFilterChange(null);
        this.props.refreshItems("");
    }

    public render() {
        const { fetchItemsLevel, items } = this.props;
        const { itemFilterValue } = this.state;

        const canClearFilter = itemFilterValue !== null && itemFilterValue !== "";

        switch (fetchItemsLevel) {
            case FetchItemsLevel.success:
            case FetchItemsLevel.refetching:
                return (
                    <ControlGroup>
                        <ItemFilterSuggest
                            items={items}
                            itemRenderer={this.itemRenderer}
                            itemListRenderer={this.itemListRenderer}
                            itemPredicate={this.itemPredicate}
                            onItemSelect={(item: Item) => {
                                this.onFilterSet(item);
                            }}
                            inputValueRenderer={v => v.name}
                            inputProps={{
                                value: itemFilterValue,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                    this.onFilterChange(e.target.value),
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
            case FetchItemsLevel.failure:
                return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
            case FetchItemsLevel.initial:
                return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
            case FetchItemsLevel.fetching:
            default:
                return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
        }
    }
}
