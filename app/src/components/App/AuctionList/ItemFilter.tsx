import * as React from 'react';
import { Spinner, Menu, MenuItem, Intent, ControlGroup, Button } from '@blueprintjs/core';
import {
  Suggest,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Item, IRegion, IRealm } from '@app/types/global';
import { FetchItemsLevel } from '@app/types/auction';

const ItemFilterSuggest = Suggest.ofType<Item>();

export type StateProps = {
  fetchItemsLevel: FetchItemsLevel
  items: Item[]
  itemFilter: Item | null
  currentRegion: IRegion | null
  currentRealm: IRealm | null
};

export type DispatchProps = {
  onItemFilterChange: (item: Item | null) => void
  refreshItems: (query: string) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  itemFilterValue: string
  timerId: NodeJS.Timer | null
}>;

export class ItemFilter extends React.Component<Props, State> {
  state: State = {
    itemFilterValue: '',
    timerId: null
  };

  itemPredicate: ItemPredicate<Item> = (query: string, item: Item) => {
    query = query.toLowerCase();
    return item.name.toLowerCase().indexOf(query) >= 0;
  }

  itemRenderer: ItemRenderer<Item> = (item: Item, { handleClick, modifiers, index }: IItemRendererProps) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    const intent = Intent.NONE;

    return (
      <MenuItem
        key={index}
        intent={intent}
        className={modifiers.active ? 'pt-active' : ''}
        onClick={handleClick}
        text={item.name}
      />
    );
  }

  itemListRenderer: ItemListRenderer<Item> = (params: IItemListRendererProps<Item>) => {
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
          <h6>Select Owner</h6>
        </li>
        {renderedItems}
      </Menu>
    );
  }

  onFilterSet(item: Item) {
    this.setState({ itemFilterValue: item.name });
    this.props.onItemFilterChange(item);
  }

  onFilterChange(itemFilterValue: string) {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(
      () => {
        this.props.refreshItems(itemFilterValue);
      },
      0.25 * 1000
    );
    this.setState({ itemFilterValue, timerId: newTimerId });
  }

  onFilterClear() {
    this.setState({ itemFilterValue: '' });
    this.props.onItemFilterChange(null);
    this.props.refreshItems('');
  }

  render() {
    const { fetchItemsLevel, items } = this.props;
    const { itemFilterValue } = this.state;

    const canClearFilter = itemFilterValue !== null && itemFilterValue !== '';

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
              onItemSelect={(item: Item) => { this.onFilterSet(item); }}
              inputValueRenderer={(v) => v.name}
              inputProps={{
                value: itemFilterValue,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.onFilterChange(e.target.value)
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