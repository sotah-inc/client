import * as React from 'react';
import { Button, Menu, MenuItem, Spinner, Intent } from '@blueprintjs/core';
import {
  Select,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { Realms, Realm, FetchRealmLevel } from '../../types';

const RealmToggleSelect = Select.ofType<Realm>();

export type StateProps = {
  realms: Realms
  currentRealm: Realm | null
  fetchRealmLevel: FetchRealmLevel
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
    const { realms, onRealmChange, currentRealm, fetchRealmLevel } = this.props;

    switch (fetchRealmLevel) {
      case FetchRealmLevel.success:
        const items = Object.keys(realms).map((realmName) => realms[realmName]);
        let highlightedRealm = items[0];
        if (currentRealm !== null) {
          highlightedRealm = currentRealm;
        }

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
            <Button text={highlightedRealm.name} rightIcon="double-caret-vertical" />
          </RealmToggleSelect>
        );
      case FetchRealmLevel.failure:
        return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
      case FetchRealmLevel.initial:
        return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
      case FetchRealmLevel.fetching:
      default:
        return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
    }
  }
}
