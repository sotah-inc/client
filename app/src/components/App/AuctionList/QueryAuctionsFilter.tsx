import {
    Alignment,
    Button,
    Callout,
    Intent,
    Menu,
    MenuItem,
    Navbar,
    NavbarGroup,
    Spinner,
    Tag,
} from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Suggest,
} from "@blueprintjs/select";
import * as React from "react";

import { IQueryAuctionsOptions } from "@app/api/data";
import { IQueryAuctionResult, QueryAuctionsLevel } from "@app/types/auction";
import { IRealm, IRegion, Item } from "@app/types/global";
import { getItemIconUrl, getItemTextValue, getSelectedResultIndex, qualityToColorClass } from "@app/util";

const QueryAuctionResultSuggest = Suggest.ofType<IQueryAuctionResult>();

export interface StateProps {
    queryAuctionsLevel: QueryAuctionsLevel;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    items: IQueryAuctionResult[];
    selectedItems: IQueryAuctionResult[];
}

export interface DispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionResult) => void;
    onAuctionsQueryDeselect: (index: number) => void;
    refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => void;
}

export interface OwnProps {}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
    filterValue: string;
    timerId: NodeJS.Timer | null;
}>;

export class QueryAuctionsFilter extends React.Component<Props, State> {
    public state: State = {
        filterValue: "",
        timerId: null,
    };

    public tagRenderer(result: IQueryAuctionResult) {
        const { item, owner } = result;
        if (item.name !== "") {
            return item.name;
        } else if (owner.name !== "") {
            return owner.name;
        }

        return "n/a";
    }

    public itemPredicate: ItemPredicate<IQueryAuctionResult> = (_query: string, result: IQueryAuctionResult) => {
        return result.rank > -1;
    };

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

    public renderItemRendererTextContent(result: IQueryAuctionResult) {
        const { item, owner } = result;

        if (item.id > 0) {
            return this.renderItemAsItemRendererText(result.item);
        } else if (owner.name !== "") {
            return owner.name;
        }

        return "n/a";
    }

    public renderItemRendererText(result: IQueryAuctionResult) {
        return <span className="qaf-menu-item">{this.renderItemRendererTextContent(result)}</span>;
    }

    public itemRenderer: ItemRenderer<IQueryAuctionResult> = (
        result: IQueryAuctionResult,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const { item, owner } = result;
        let className = modifiers.active ? "pt-active" : "";

        let label = "n/a";
        if (item.name !== "") {
            label = `#${item.id}`;
            className = `${className} ${qualityToColorClass(result.item.quality)}`;
        } else if (owner.name !== "") {
            label = "Owner";
        }

        return (
            <MenuItem
                key={index}
                icon={this.isResultSelected(result) ? "tick" : "blank"}
                className={className}
                onClick={handleClick}
                text={this.renderItemRendererText(result)}
                label={label}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<IQueryAuctionResult> = (
        params: IItemListRendererProps<IQueryAuctionResult>,
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
            <Menu ulRef={itemsParentRef} className="qaf-menu">
                <li>
                    <h6>Queried Results</h6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public onItemSelect(result: IQueryAuctionResult) {
        if (this.isResultSelected(result)) {
            this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        this.props.onAuctionsQuerySelect(result);
    }

    public onItemDeselect(index: number) {
        this.props.onAuctionsQueryDeselect(index);
    }

    public onFilterChange(filterValue: string) {
        const { timerId } = this.state;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            this.props.refreshAuctionsQuery({
                regionName: this.props.currentRegion!.name,
                realmSlug: this.props.currentRealm!.slug,
                query: filterValue,
            });
        }, 0.25 * 1000);
        this.setState({ filterValue, timerId: newTimerId });
    }

    public isResultSelected(result: IQueryAuctionResult) {
        return this.getSelectedResultIndex(result) > -1;
    }

    public getSelectedResultIndex(result: IQueryAuctionResult): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    public resolveResultTextValue(result: IQueryAuctionResult): string {
        const { item, owner } = result;

        if (item.id > 0) {
            return getItemTextValue(item);
        } else if (owner.name !== "") {
            return owner.name;
        }

        return "n/a";
    }

    public renderSelectedItem(index: number, result: IQueryAuctionResult) {
        return (
            <Tag key={index} onRemove={() => this.props.onAuctionsQueryDeselect(index)} style={{ marginRight: "5px" }}>
                {this.resolveResultTextValue(result)}
            </Tag>
        );
    }

    public renderSelectedItems() {
        const { selectedItems } = this.props;
        if (selectedItems.length === 0) {
            return;
        }

        return (
            <Callout>
                <h4 className="pt-callout-title">Filters</h4>
                <div className="pt-tag-input">
                    <div className="pt-tag-input-values">
                        {selectedItems.map((v, i) => this.renderSelectedItem(i, v))}
                    </div>
                </div>
            </Callout>
        );
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
                    this.setState({ filterValue: "" });
                    this.props.refreshAuctionsQuery({
                        regionName: this.props.currentRegion!.name,
                        realmSlug: this.props.currentRealm!.slug,
                        query: "",
                    });
                }}
            />
        );
    }

    public render() {
        const { queryAuctionsLevel, items } = this.props;
        const { filterValue } = this.state;

        switch (queryAuctionsLevel) {
            case QueryAuctionsLevel.success:
            case QueryAuctionsLevel.refetching:
                return (
                    <>
                        <Navbar>
                            <NavbarGroup align={Alignment.LEFT}>
                                <QueryAuctionResultSuggest
                                    inputValueRenderer={v => this.resolveResultTextValue(v)}
                                    itemRenderer={this.itemRenderer}
                                    items={items}
                                    onItemSelect={(result: IQueryAuctionResult) => {
                                        this.onItemSelect(result);
                                    }}
                                    closeOnSelect={false}
                                    inputProps={{
                                        value: filterValue,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                            this.onFilterChange(e.target.value),
                                        type: "search",
                                        leftIcon: "search",
                                        rightElement: this.renderClearButton(),
                                    }}
                                    itemPredicate={this.itemPredicate}
                                    itemListRenderer={this.itemListRenderer}
                                />
                            </NavbarGroup>
                        </Navbar>
                        {this.renderSelectedItems()}
                    </>
                );
            case QueryAuctionsLevel.failure:
                return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
            case QueryAuctionsLevel.initial:
                return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
            case QueryAuctionsLevel.fetching:
            default:
                return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
        }
    }
}
