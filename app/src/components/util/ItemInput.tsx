import React, { useState } from "react";

import { Classes, H6, Menu, MenuItem } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    Suggest,
} from "@blueprintjs/select";
import { debounce } from "lodash";

import { IQueryItemsItem } from "@app/api-types/contracts/data";
import { IItem, ItemId } from "@app/api-types/item";
import { getItems } from "@app/api/data";
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from "@app/util";

const ItemSuggest = Suggest.ofType<IQueryItemsItem>();

export interface IOwnProps {
    autoFocus?: boolean;
    itemIdBlacklist?: ItemId[];
    closeOnSelect?: boolean;
    onSelect(item: IItem): void;
}

type Props = Readonly<IOwnProps>;

const inputValueRenderer = (result: IQueryItemsItem): string => {
    if (result.item.id === 0) {
        return "n/a";
    }

    return getItemTextValue(result.item);
};

const renderItemAsItemRendererText = (item: IItem) => {
    const itemText = getItemTextValue(item);
    const itemIconUrl = getItemIconUrl(item);

    if (itemIconUrl === null) {
        return itemText;
    }

    return (
        <>
            <img src={itemIconUrl} className="item-icon" alt="" /> {itemText}
        </>
    );
};

const renderItemRendererTextContent = (item: IItem) => {
    if (item.id === 0) {
        return "n/a";
    }

    return renderItemAsItemRendererText(item);
};

const renderItemRendererText = (item: IItem) => {
    return <span className="item-input-menu-item">{renderItemRendererTextContent(item)}</span>;
};

const itemPredicate: ItemPredicate<IQueryItemsItem> = (_: string, result: IQueryItemsItem) => {
    return result.rank > -1;
};

const itemListRenderer: ItemListRenderer<IQueryItemsItem> = (params: IItemListRendererProps<IQueryItemsItem>) => {
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

export function ItemInput(props: Props) {
    const { autoFocus, onSelect, closeOnSelect, itemIdBlacklist } = props;

    const [results, setResults] = useState<IQueryItemsItem[]>([]);

    return (
        <ItemSuggest
            inputValueRenderer={inputValueRenderer}
            itemRenderer={(result, itemRendererProps: IItemRendererProps) => {
                const { handleClick, modifiers, index } = itemRendererProps;

                const disabled: boolean = (() => {
                    if (typeof itemIdBlacklist === "undefined") {
                        return false;
                    }

                    return itemIdBlacklist.indexOf(result.item.id) > -1;
                })();

                if (!modifiers.matchesPredicate) {
                    return null;
                }

                let className = modifiers.active ? Classes.ACTIVE : "";
                const { item } = result;

                let label = "n/a";
                if (item.name !== "") {
                    label = `#${item.id}`;
                    className = `${className} ${qualityToColorClass(item.quality)}`;
                }

                return (
                    <MenuItem
                        key={index}
                        className={className}
                        onClick={handleClick}
                        text={renderItemRendererText(item)}
                        label={label}
                        disabled={disabled}
                    />
                );
            }}
            items={results}
            onItemSelect={v => onSelect(v.item)}
            closeOnSelect={typeof closeOnSelect === "undefined" ? true : closeOnSelect}
            onQueryChange={debounce(async (filterValue: string) => {
                const res = await getItems(filterValue);
                if (res === null) {
                    return;
                }

                setResults(res.items);
            }, 0.25 * 1000)}
            inputProps={{
                autoFocus,
                className: Classes.FILL,
                leftIcon: "search",
                type: "search",
            }}
            itemPredicate={itemPredicate}
            itemListRenderer={itemListRenderer}
        />
    );
}
