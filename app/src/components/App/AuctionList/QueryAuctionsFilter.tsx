import * as React from "react";

import {
    Alignment,
    Callout,
    Classes,
    H4,
    H6,
    Intent,
    Menu,
    MenuItem,
    Navbar,
    NavbarGroup,
    Spinner,
    Switch,
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
import { debounce } from "lodash";

import { IQueryAuctionsOptions } from "@app/api/data";
import { IQueryAuctionResult, QueryAuctionsLevel } from "@app/types/auction";
import { IRealm, IRegion, Item } from "@app/types/global";
import { getItemIconUrl, getItemTextValue, getSelectedResultIndex, qualityToColorClass } from "@app/util";

const QueryAuctionResultSuggest = Suggest.ofType<IQueryAuctionResult>();

export interface IStateProps {
    queryAuctionsLevel: QueryAuctionsLevel;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    items: IQueryAuctionResult[];
    selectedItems: IQueryAuctionResult[];
    activeSelect: boolean;
}

export interface IDispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionResult) => void;
    onAuctionsQueryDeselect: (index: number) => void;
    refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => void;
    activeSelectChange: (v: boolean) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class QueryAuctionsFilter extends React.Component<Props> {
    private debouncedTriggerQuery = debounce((filterValue: string) => this.triggerQuery(filterValue), 0.25 * 1000);

    public render() {
        const { queryAuctionsLevel, items, activeSelect } = this.props;

        switch (queryAuctionsLevel) {
            case QueryAuctionsLevel.success:
            case QueryAuctionsLevel.refetching:
                return (
                    <>
                        <Navbar>
                            <NavbarGroup align={Alignment.LEFT}>
                                <QueryAuctionResultSuggest
                                    inputValueRenderer={this.inputValueRenderer}
                                    itemRenderer={this.itemRenderer}
                                    items={items}
                                    onItemSelect={v => this.onItemSelect(v)}
                                    closeOnSelect={false}
                                    onQueryChange={this.debouncedTriggerQuery}
                                    inputProps={{
                                        leftIcon: "search",
                                        type: "search",
                                    }}
                                    itemPredicate={this.itemPredicate}
                                    itemListRenderer={this.itemListRenderer}
                                />
                            </NavbarGroup>
                            <NavbarGroup align={Alignment.RIGHT}>
                                <Switch
                                    checked={activeSelect}
                                    label="Active"
                                    style={{ marginBottom: "0" }}
                                    onChange={() => this.onActiveChange()}
                                />
                            </NavbarGroup>
                        </Navbar>
                        {this.renderSelectedItems()}
                    </>
                );
            case QueryAuctionsLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case QueryAuctionsLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case QueryAuctionsLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }

    private onActiveChange() {
        const { activeSelectChange, activeSelect } = this.props;

        activeSelectChange(!activeSelect);
    }

    private itemPredicate: ItemPredicate<IQueryAuctionResult> = (_query: string, result: IQueryAuctionResult) => {
        return result.rank > -1;
    };

    private renderItemAsItemRendererText(item: Item) {
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

    private renderItemRendererTextContent(result: IQueryAuctionResult) {
        const { item, owner } = result;

        if (item !== null) {
            return this.renderItemAsItemRendererText(item);
        } else if (owner !== null) {
            return owner.name;
        }

        return "n/a";
    }

    private renderItemRendererText(result: IQueryAuctionResult) {
        return <span className="qaf-menu-item">{this.renderItemRendererTextContent(result)}</span>;
    }

    private itemRenderer: ItemRenderer<IQueryAuctionResult> = (
        result: IQueryAuctionResult,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const { item, owner } = result;
        let className = modifiers.active ? Classes.ACTIVE : "";

        let label = "n/a";
        if (item !== null) {
            label = `#${item.id}`;
            className = `${className} ${qualityToColorClass(item.quality)}`;
        } else if (owner !== null) {
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

    private itemListRenderer: ItemListRenderer<IQueryAuctionResult> = (
        params: IItemListRendererProps<IQueryAuctionResult>,
    ) => {
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
            <Menu ulRef={itemsParentRef} className="qaf-menu">
                <li>
                    <H6>Queried Results</H6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    private onItemSelect(result: IQueryAuctionResult) {
        const { onAuctionsQueryDeselect, onAuctionsQuerySelect } = this.props;

        if (this.isResultSelected(result)) {
            onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        onAuctionsQuerySelect(result);
    }

    private triggerQuery(filterValue: string) {
        const { refreshAuctionsQuery, currentRealm, currentRegion } = this.props;

        refreshAuctionsQuery({
            query: filterValue,
            realmSlug: currentRealm!.slug,
            regionName: currentRegion!.name,
        });
    }

    private isResultSelected(result: IQueryAuctionResult) {
        return this.getSelectedResultIndex(result) > -1;
    }

    private getSelectedResultIndex(result: IQueryAuctionResult): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    private inputValueRenderer(result: IQueryAuctionResult): string {
        const { item, owner } = result;

        if (item !== null) {
            return getItemTextValue(item);
        } else if (owner !== null) {
            return owner.name;
        }

        return "n/a";
    }

    private renderSelectedItem(index: number, result: IQueryAuctionResult) {
        const { onAuctionsQueryDeselect } = this.props;

        return (
            <Tag key={index} onRemove={() => onAuctionsQueryDeselect(index)} style={{ marginRight: "5px" }}>
                {this.inputValueRenderer(result)}
            </Tag>
        );
    }

    private renderSelectedItems() {
        const { selectedItems } = this.props;

        if (selectedItems.length === 0) {
            return;
        }

        return (
            <Callout>
                <H4 className={Classes.HEADING}>Filters</H4>
                <div className={Classes.TAG_INPUT}>
                    <div className={Classes.TAG_INPUT_VALUES}>
                        {selectedItems.map((v, i) => this.renderSelectedItem(i, v))}
                    </div>
                </div>
            </Callout>
        );
    }
}
