import * as React from "react";

import { Button, Menu, MenuItem } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Suggest,
} from "@blueprintjs/select";

import { getItems } from "@app/api/data";
import { IQueryItemResult, Item } from "@app/types/global";
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from "@app/util";

const ItemSuggest = Suggest.ofType<IQueryItemResult>();

type Props = Readonly<{
    autoFocus?: boolean;
    onSelect(item: Item): void;
}>;

type State = Readonly<{
    timerId: NodeJS.Timer | null;
    filterValue: string;
    results: IQueryItemResult[];
}>;

export class ItemInput extends React.Component<Props, State> {
    public state: State = {
        timerId: null,
        filterValue: "",
        results: [],
    };

    public componentDidMount() {
        this.triggerQuery();
    }

    public renderItemAsItemRendererText(item: Item) {
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

    public renderItemRendererTextContent(item: Item) {
        if (item.id === 0) {
            return "n/a";
        }

        return this.renderItemAsItemRendererText(item);
    }

    public renderItemRendererText(item: Item) {
        return <span className="item-input-menu-item">{this.renderItemRendererTextContent(item)}</span>;
    }

    public itemRenderer: ItemRenderer<IQueryItemResult> = (
        result: IQueryItemResult,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        let className = modifiers.active ? "pt-active" : "";
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
                text={this.renderItemRendererText(item)}
                label={label}
            />
        );
    };

    public resolveResultTextValue(result: IQueryItemResult): string {
        if (result.item.id === 0) {
            return "n/a";
        }

        return getItemTextValue(result.item);
    }

    public onItemSelect(result: IQueryItemResult) {
        this.props.onSelect(result.item);
    }

    public async triggerQuery() {
        const res = await getItems(this.state.filterValue);
        if (res === null) {
            return;
        }

        this.setState({ results: res.items });
    }

    public onFilterChange(filterValue: string) {
        const { timerId } = this.state;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            (async () => {
                this.triggerQuery();
            })();
        }, 0.25 * 1000);
        this.setState({ filterValue, timerId: newTimerId });
    }

    public renderClearButton() {
        const { filterValue } = this.state;
        if (filterValue === null || filterValue === "") {
            return;
        }

        return (
            <Button
                icon="cross"
                className="pt-minimal"
                onClick={() => {
                    this.setState({ filterValue: "" }, () => this.triggerQuery());
                }}
            />
        );
    }

    public itemPredicate: ItemPredicate<IQueryItemResult> = (_: string, result: IQueryItemResult) => {
        return result.rank > -1;
    };

    public itemListRenderer: ItemListRenderer<IQueryItemResult> = (
        params: IItemListRendererProps<IQueryItemResult>,
    ) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <h6>Queried Results</h6>
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
                    <h6>Queried Results</h6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public render() {
        const { autoFocus } = this.props;
        const { results, filterValue } = this.state;

        return (
            <ItemSuggest
                inputValueRenderer={v => this.resolveResultTextValue(v)}
                itemRenderer={this.itemRenderer}
                items={results}
                onItemSelect={(result: IQueryItemResult) => {
                    this.onItemSelect(result);
                }}
                closeOnSelect={true}
                inputProps={{
                    value: filterValue,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.onFilterChange(e.target.value),
                    type: "search",
                    leftIcon: "search",
                    rightElement: this.renderClearButton(),
                    className: "pt-fill",
                    autoFocus,
                }}
                itemPredicate={this.itemPredicate}
                itemListRenderer={this.itemListRenderer}
            />
        );
    }
}
