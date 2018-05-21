import * as React from 'react';
import { Spinner, Menu, MenuItem, Intent, ControlGroup, Button } from '@blueprintjs/core';
import {
  MultiSelect,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Region, Realm } from '@app/types/global';
import { QueryAuctionsLevel, QueryAuctionResult } from '@app/types/auction';

const QueryAuctionResultMultiselect = MultiSelect.ofType<QueryAuctionResult>();

export type StateProps = {
  queryAuctionsLevel: QueryAuctionsLevel
  currentRegion: Region | null
  currentRealm: Realm | null
  items: QueryAuctionResult[]
  selectedItems: QueryAuctionResult[]
};

export type DispatchProps = {
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  filterValue: string
  timerId: NodeJS.Timer | null
}>;

export class QueryAuctionsFilter extends React.Component<Props, State> {
  state: State = {
    filterValue: '',
    timerId: null
  };
  
  tagRenderer(result: QueryAuctionResult) {
    const { item, owner } = result;
    if (item.name !== '') {
      return item.name;
    } else if (owner.name !== '') {
      return owner.name;
    }

    return 'n/a';
  }

  itemPredicate: ItemPredicate<QueryAuctionResult> = (query: string, result: QueryAuctionResult) => {
    const { item, owner } = result;

    query = query.toLowerCase();
    if (item.name !== '') {
      return item.name.toLowerCase().indexOf(query) >= 0;
    } else if (owner.name !== '') {
      return owner.name.toLowerCase().indexOf(query) >= 0;
    }

    return false;
  }

  itemRenderer: ItemRenderer<QueryAuctionResult> = (
    result: QueryAuctionResult,
    { handleClick, modifiers, index }: IItemRendererProps
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    const intent = Intent.NONE;
    const { item, owner } = result;

    let text = 'n/a';
    if (item.name !== '') {
      text = item.name;
    } else if (owner.name !== '') {
      text = owner.name;
    }

    return (
      <MenuItem
        key={index}
        intent={intent}
        className={modifiers.active ? 'pt-active' : ''}
        onClick={handleClick}
        text={text}
      />
    );
  }

  itemListRenderer: ItemListRenderer<QueryAuctionResult> = (params: IItemListRendererProps<QueryAuctionResult>) => {
    const { items, itemsParentRef, renderItem } = params;
    const renderedItems = items.map(renderItem).filter((renderedItem) => renderedItem !== null);
    if (renderedItems.length === 0) {
      return (
        <Menu ulRef={itemsParentRef}>
          <li>
            <h6>Select Item</h6>
          </li>
          <li><em>No results found.</em></li>
        </Menu>
      );
    }

    return (
      <Menu ulRef={itemsParentRef}>
        <li>
          <h6>Queried Result</h6>
        </li>
        {renderedItems}
      </Menu>
    );
  }

  onItemSelect(result: QueryAuctionResult) {
    console.log(result);
  }

  onFilterChange(filterValue: string) {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(
      () => {
        console.log(`refreshing via ${filterValue}`);
      },
      0.25 * 1000
    );
    this.setState({ filterValue, timerId: newTimerId });
  }

  onFilterClear() {
    console.log('clear');
  }

  render() {
    const { queryAuctionsLevel, items, selectedItems } = this.props;
    const { filterValue } = this.state;

    const canClearFilter = filterValue !== null && filterValue !== '';

    switch (queryAuctionsLevel) {
      case QueryAuctionsLevel.success:
      case QueryAuctionsLevel.refetching:
        return (
          <ControlGroup>
            <QueryAuctionResultMultiselect
              itemRenderer={this.itemRenderer}
              items={items}
              onItemSelect={(result: QueryAuctionResult) => { this.onItemSelect(result); }}
              tagRenderer={this.tagRenderer}
              itemListRenderer={this.itemListRenderer}
              itemPredicate={this.itemPredicate}
              selectedItems={selectedItems}
            />
            <Button
              icon="filter-remove"
              disabled={!canClearFilter}
              text="Clear"
              onClick={() => this.onFilterClear()}
            />
          </ControlGroup>
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