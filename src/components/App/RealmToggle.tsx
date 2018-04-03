import * as React from 'react';
import { Button, MenuItem, Spinner } from '@blueprintjs/core';
import { Select, ItemPredicate, ItemRenderer, IItemRendererProps } from '@blueprintjs/select';

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
    return item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  }

  itemRenderer: ItemRenderer<Realm> = (realm: Realm, { handleClick, modifiers, index }: IItemRendererProps) => {
    return (
      <MenuItem
        key={index}
        className={modifiers.active ? 'pt-active' : ''}
        label={realm.name}
        onClick={handleClick}
        text={realm.name}
      />
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
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={(realm: Realm) => onRealmChange(realm)}
      >
        <Button text={items[0].name} rightIcon="double-caret-vertical" />
      </RealmToggleSelect>
    );
  }
}
