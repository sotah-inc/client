import * as React from 'react';
import { Button, Menu, MenuItem, Spinner } from '@blueprintjs/core';
import {
  Select,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Realms, Realm } from '../../types';

const RealmToggleSelect = Select.ofType<Realm>();

export type StateProps = {
  realms: Realms
};

export type DispatchProps = {
  onRealmChange: (realm: Realm) => void;
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RealmToggle extends React.Component<Props> {
  itemPredicate: ItemPredicate<Realm> = (query: string, item: Realm) => {
    query = query.toLowerCase();
    return item.name.toLowerCase().indexOf(query) >= 0
      || item.battlegroup.toLowerCase().indexOf(query) >= 0;
  }

  itemRenderer: ItemRenderer<Realm> = (realm: Realm, { handleClick, modifiers, index }: IItemRendererProps) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        key={index}
        className={modifiers.active ? 'pt-active' : ''}
        label={realm.battlegroup}
        onClick={handleClick}
        text={realm.name}
      />
    );
  }

  itemListRenderer: ItemListRenderer<Realm> =  (params: IItemListRendererProps<Realm>) => {
    const { items, itemsParentRef, renderItem } = params;
    const renderedItems = items.map(renderItem).filter((renderedItem) => renderedItem !== null);
    return (
      <Menu ulRef={itemsParentRef}>
        <li>
          <h6>Select Realm</h6>
        </li>
        {renderedItems}
      </Menu>
    );
  }

  render() {
    const { realms, onRealmChange } = this.props;
    if (Object.keys(realms).length === 0) {
      return <Spinner className="pt-small"/>;
    }

    const items = Object.keys(realms).map((realmName) => realms[realmName]);
    return (
      <RealmToggleSelect
        items={items}
        itemRenderer={this.itemRenderer}
        itemListRenderer={this.itemListRenderer}
        itemPredicate={this.itemPredicate}
        onItemSelect={(realm: Realm) => onRealmChange(realm)}
        resetOnSelect={true}
        resetOnClose={true}
      >
        <Button text={items[0].name} rightIcon="double-caret-vertical" />
      </RealmToggleSelect>
    );
  }
}
