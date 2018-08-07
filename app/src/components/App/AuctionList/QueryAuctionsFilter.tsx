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
}

export interface IDispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionResult) => void;
    onAuctionsQueryDeselect: (index: number) => void;
    refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    timerId: NodeJS.Timer | null;
}>;

export class QueryAuctionsFilter extends React.Component<Props, State> {
    public state: State = {
        timerId: null,
    };

    private debouncedTriggerQuery = debounce((filterValue: string) => this.triggerQuery(filterValue), 0.25 * 1000);

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
        let className = modifiers.active ? Classes.ACTIVE : "";

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

    public onItemSelect(result: IQueryAuctionResult) {
        const { onAuctionsQueryDeselect, onAuctionsQuerySelect } = this.props;

        if (this.isResultSelected(result)) {
            onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        onAuctionsQuerySelect(result);
    }

    public triggerQuery(filterValue: string) {
        const { refreshAuctionsQuery, currentRealm, currentRegion } = this.props;

        refreshAuctionsQuery({
            query: filterValue,
            realmSlug: currentRealm!.slug,
            regionName: currentRegion!.name,
        });
    }

    public isResultSelected(result: IQueryAuctionResult) {
        return this.getSelectedResultIndex(result) > -1;
    }

    public getSelectedResultIndex(result: IQueryAuctionResult): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    public inputValueRenderer(result: IQueryAuctionResult): string {
        const { item, owner } = result;

        if (item.id > 0) {
            return getItemTextValue(item);
        } else if (owner.name !== "") {
            return owner.name;
        }

        return "n/a";
    }

    public renderSelectedItem(index: number, result: IQueryAuctionResult) {
        const { onAuctionsQueryDeselect } = this.props;

        return (
            <Tag key={index} onRemove={() => onAuctionsQueryDeselect(index)} style={{ marginRight: "5px" }}>
                {this.inputValueRenderer(result)}
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
                <H4 className={Classes.HEADING}>Filters</H4>
                <div className={Classes.TAG_INPUT}>
                    <div className={Classes.TAG_INPUT_VALUES}>
                        {selectedItems.map((v, i) => this.renderSelectedItem(i, v))}
                    </div>
                </div>
            </Callout>
        );
    }

    public render() {
        const { queryAuctionsLevel, items } = this.props;

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
}
