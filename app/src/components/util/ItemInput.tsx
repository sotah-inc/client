import * as React from "react";

import { Classes, H6, Menu, MenuItem } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Suggest,
} from "@blueprintjs/select";
import { debounce } from "lodash";

import { IQueryItemsItem } from "@app/api-types/contracts/data";
import { IItem, ItemId } from "@app/api-types/item";
import { getItems } from "@app/api/data";
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from "@app/util";

const ItemSuggest = Suggest.ofType<IQueryItemsItem>();

type Props = Readonly<{
    autoFocus?: boolean;
    itemIdBlacklist?: ItemId[];
    closeOnSelect?: boolean;
    onSelect(item: IItem): void;
}>;

type State = Readonly<{
    timerId: NodeJS.Timer | null;
    results: IQueryItemsItem[];
}>;

export class ItemInput extends React.Component<Props, State> {
    public state: State = {
        results: [],
        timerId: null,
    };

    private debouncedTriggerQuery = debounce((filterValue: string) => this.triggerQuery(filterValue), 0.25 * 1000);

    public componentDidMount() {
        this.triggerQuery("");
    }

    public renderItemAsItemRendererText(item: IItem) {
        const itemText = getItemTextValue(item);
        const itemIconUrl = getItemIconUrl(item);

        if (itemIconUrl === null) {
            return itemText;
        }

        return (
            <>
                <img src={itemIconUrl} className="item-icon" /> {itemText}
            </>
        );
    }

    public renderItemRendererTextContent(item: IItem) {
        if (item.id === 0) {
            return "n/a";
        }

        return this.renderItemAsItemRendererText(item);
    }

    public renderItemRendererText(item: IItem) {
        return <span className="item-input-menu-item">{this.renderItemRendererTextContent(item)}</span>;
    }

    public itemRenderer: ItemRenderer<IQueryItemsItem> = (
        result: IQueryItemsItem,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const { itemIdBlacklist } = this.props;

        let className = modifiers.active ? Classes.ACTIVE : "";
        const { item } = result;

        let label = "n/a";
        if (item.name !== "") {
            label = `#${item.id}`;
            className = `${className} ${qualityToColorClass(item.quality)}`;
        }

        const disabled: boolean = (() => {
            if (typeof itemIdBlacklist === "undefined") {
                return false;
            }

            return itemIdBlacklist.indexOf(item.id) > -1;
        })();

        return (
            <MenuItem
                key={index}
                className={className}
                onClick={handleClick}
                text={this.renderItemRendererText(item)}
                label={label}
                disabled={disabled}
            />
        );
    };

    public resolveResultTextValue(result: IQueryItemsItem): string {
        if (result.item.id === 0) {
            return "n/a";
        }

        return getItemTextValue(result.item);
    }

    public onItemSelect(result: IQueryItemsItem) {
        this.props.onSelect(result.item);
    }

    public async triggerQuery(filterValue: string) {
        const res = await getItems(filterValue);
        if (res === null) {
            return;
        }

        this.setState({ results: res.items });
    }

    public itemPredicate: ItemPredicate<IQueryItemsItem> = (_: string, result: IQueryItemsItem) => {
        return result.rank > -1;
    };

    public itemListRenderer: ItemListRenderer<IQueryItemsItem> = (params: IItemListRendererProps<IQueryItemsItem>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <H6>Queried Results</H6>
                    </li>
                    <li>
                        <em>No results found.</em>
                    </li>
                </Menu>
            );
        }

        return (
            <Menu ulRef={itemsParentRef} className="item-input-menu">
                <li>
                    <H6>Queried Results</H6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public render() {
        const { autoFocus, onSelect, closeOnSelect } = this.props;
        const { results } = this.state;

        return (
            <ItemSuggest
                inputValueRenderer={this.resolveResultTextValue}
                itemRenderer={this.itemRenderer}
                items={results}
                onItemSelect={v => onSelect(v.item)}
                closeOnSelect={typeof closeOnSelect === "undefined" ? true : closeOnSelect}
                onQueryChange={this.debouncedTriggerQuery}
                inputProps={{
                    autoFocus,
                    className: Classes.FILL,
                    leftIcon: "search",
                    type: "search",
                }}
                itemPredicate={this.itemPredicate}
                itemListRenderer={this.itemListRenderer}
            />
        );
    }
}
