import * as React from 'react';
import { Spinner, Menu, MenuItem, Intent } from '@blueprintjs/core';
import {
  Suggest,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Owner } from '@app/types/global';
import { FetchOwnersLevel } from '@app/types/auction';

const OwnerFilterSuggest = Suggest.ofType<Owner>();

export type StateProps = {
  fetchOwnersLevel: FetchOwnersLevel
};

export type DispatchProps = {};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class OwnerFilter extends React.Component<Props> {
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
        label={owner.name}
        onClick={handleClick}
        text={owner.name}
      />
    );
  }

  itemListRenderer: ItemListRenderer<Owner> = (params: IItemListRendererProps<Owner>) => {
    const { items, itemsParentRef, renderItem } = params;
    const renderedItems = items.map(renderItem).filter((renderedItem) => renderedItem !== null);
    return (
      <Menu ulRef={itemsParentRef}>
        <li>
          <h6>Select Owner</h6>
        </li>
        {renderedItems}
      </Menu>
    );
  }

  render() {
    const { fetchOwnersLevel } = this.props;
    const items: Owner[] = [];

    switch (fetchOwnersLevel) {
      case FetchOwnersLevel.success:
        return (
          <OwnerFilterSuggest
            items={items}
            itemRenderer={this.itemRenderer}
            itemListRenderer={this.itemListRenderer}
            itemPredicate={this.itemPredicate}
            onItemSelect={(owner: Owner) => { console.log(owner); }}
            inputValueRenderer={(v) => v.name}
          />
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