import * as React from 'react';
import { Spinner, Menu, MenuItem, Intent, Tag, Navbar, NavbarGroup, Alignment } from '@blueprintjs/core';
import {
  Suggest,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Region, Realm } from '@app/types/global';
import { QueryAuctionsLevel, QueryAuctionResult } from '@app/types/auction';
import { QueryAuctionsOptions } from '@app/api/data';

const QueryAuctionResultMultiselect = Suggest.ofType<QueryAuctionResult>();

export type StateProps = {
  queryAuctionsLevel: QueryAuctionsLevel
  currentRegion: Region | null
  currentRealm: Realm | null
  items: QueryAuctionResult[]
  selectedItems: QueryAuctionResult[]
};

export type DispatchProps = {
  onAuctionsQuerySelect: (aqResult: QueryAuctionResult) => void
  onAuctionsQueryDeselect: (index: number) => void
  refreshAuctionsQuery: (opts: QueryAuctionsOptions) => void
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

    const { item, owner } = result;

    let label = 'n/a';
    let text = 'n/a';
    if (item.name !== '') {
      text = item.name;
      label = `#${item.id}`;
    } else if (owner.name !== '') {
      text = owner.name;
      label = 'Owner';
    }

    return (
      <MenuItem
        key={index}
        icon={this.isResultSelected(result) ? 'tick' : 'blank'}
        className={modifiers.active ? 'pt-active' : ''}
        onClick={handleClick}
        text={text}
        label={label}
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
            <h6>Queried Results</h6>
          </li>
          <li><em>No results found.</em></li>
        </Menu>
      );
    }

    return (
      <Menu ulRef={itemsParentRef}>
        <li>
          <h6>Queried Results</h6>
        </li>
        {renderedItems}
      </Menu>
    );
  }

  onItemSelect(result: QueryAuctionResult) {
    if (this.isResultSelected(result)) {
      this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

      return;
    }

    this.props.onAuctionsQuerySelect(result);
  }

  onItemDeselect(index: number) {
    this.props.onAuctionsQueryDeselect(index);
  }

  onFilterChange(filterValue: string) {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(
      () => {
        this.props.refreshAuctionsQuery({
          regionName: this.props.currentRegion!.name,
          realmSlug: this.props.currentRealm!.slug,
          query: filterValue
        });
      },
      0.25 * 1000
    );
    this.setState({ filterValue, timerId: newTimerId });
  }

  onFilterClear() {
    console.log('clear');
  }

  isResultSelected(result: QueryAuctionResult) {
    return this.getSelectedResultIndex(result) > -1;
  }

  getSelectedResultIndex(result: QueryAuctionResult) {
    return this.props.selectedItems.indexOf(result);
  }

  resolveResultTextValue(result: QueryAuctionResult) {
    const { item, owner } = result;

    if (item.name !== '') {
      return item.name;
    } else if (owner.name !== '') {
      return owner.name;
    }

    return 'n/a';
  }

  renderSelectedItem(index: number, result: QueryAuctionResult) {
    return (
      <div>
        <Tag
          key={index}
          onRemove={() => this.props.onAuctionsQueryDeselect(index)}
          style={{marginRight: '5px'}}
        >
          {this.resolveResultTextValue(result)}
        </Tag>
      </div>
    );
  }

  renderSelectedItems() {
    const { selectedItems } = this.props;
    if (selectedItems.length === 0) {
      return;
    }

    return (
      <Navbar>
        <NavbarGroup>
          {selectedItems.map((v, i) => this.renderSelectedItem(i, v))}
        </NavbarGroup>
      </Navbar>
    );
  }

  render() {
    const { queryAuctionsLevel, items } = this.props;
    const { filterValue } = this.state;

    switch (queryAuctionsLevel) {
      case QueryAuctionsLevel.success:
      case QueryAuctionsLevel.refetching:
        return (
          <>
            <Navbar>
              <NavbarGroup align={Alignment.LEFT}>
                <QueryAuctionResultMultiselect
                  inputValueRenderer={(v) => this.resolveResultTextValue(v)}
                  itemRenderer={this.itemRenderer}
                  items={items}
                  onItemSelect={(result: QueryAuctionResult) => { this.onItemSelect(result); }}
                  closeOnSelect={false}
                  inputProps={{
                    value: filterValue,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.onFilterChange(e.target.value)
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