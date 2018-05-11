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

import { Owner, OwnerName, Region, Realm } from '@app/types/global';
import { FetchOwnersLevel } from '@app/types/auction';
import { GetOwnersOptions } from '@app/api/data';

const OwnerFilterSuggest = Suggest.ofType<Owner>();

export type StateProps = {
  fetchOwnersLevel: FetchOwnersLevel
  owners: Owner[]
  ownerFilter: OwnerName | null
  currentRegion: Region | null
  currentRealm: Realm | null
};

export type DispatchProps = {
  onOwnerFilterChange: (ownerName: OwnerName | null) => void
  refreshOwners: (opts: GetOwnersOptions) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  ownerFilterValue: string
  timerId: NodeJS.Timer | null
}>;

export class OwnerFilter extends React.Component<Props, State> {
  state: State = {
    ownerFilterValue: '',
    timerId: null
  };

  itemPredicate: ItemPredicate<Owner> = (query: string, item: Owner) => {
    query = query.toLowerCase();
    return item.name.toLowerCase().indexOf(query) >= 0;
  }

  itemRenderer: ItemRenderer<Owner> = (owner: Owner, { handleClick, modifiers, index }: IItemRendererProps) => {
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
        text={owner.name}
      />
    );
  }

  itemListRenderer: ItemListRenderer<Owner> = (params: IItemListRendererProps<Owner>) => {
    const { items, itemsParentRef, renderItem } = params;
    const renderedItems = items.map(renderItem).filter((renderedItem) => renderedItem !== null);
    if (renderedItems.length === 0) {
      return (
        <Menu ulRef={itemsParentRef}>
          <li>
            <h6>Select Owner</h6>
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

  onFilterSet(owner: Owner) {
    this.setState({ ownerFilterValue: owner.name });
    this.props.onOwnerFilterChange(owner.name);
  }

  onFilterChange(ownerFilterValue: string) {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(
      () => {
        this.props.refreshOwners({
          regionName: this.props.currentRegion!.name,
          realmSlug: this.props.currentRealm!.slug,
          query: ownerFilterValue
        });
      },
      0.25 * 1000
    );
    this.setState({ ownerFilterValue, timerId: newTimerId });
  }

  onFilterClear() {
    this.setState({ ownerFilterValue: '' });
    this.props.onOwnerFilterChange(null);
    this.props.refreshOwners({
      regionName: this.props.currentRegion!.name,
      realmSlug: this.props.currentRealm!.slug,
      query: ''
    });
  }

  render() {
    const { fetchOwnersLevel, owners } = this.props;
    const { ownerFilterValue } = this.state;

    const canClearFilter = ownerFilterValue !== null && ownerFilterValue !== '';

    switch (fetchOwnersLevel) {
      case FetchOwnersLevel.success:
      case FetchOwnersLevel.refetching:
        return (
          <ControlGroup>
            <OwnerFilterSuggest
              items={owners}
              itemRenderer={this.itemRenderer}
              itemListRenderer={this.itemListRenderer}
              itemPredicate={this.itemPredicate}
              onItemSelect={(owner: Owner) => { this.onFilterSet(owner); }}
              inputValueRenderer={(v) => v.name}
              inputProps={{
                value: ownerFilterValue,
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
      case FetchOwnersLevel.failure:
        return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
      case FetchOwnersLevel.initial:
        return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
      case FetchOwnersLevel.fetching:
      default:
        return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
    }
  }
}