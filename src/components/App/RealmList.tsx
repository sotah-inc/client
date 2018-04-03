import * as React from 'react';

import { FetchRealmLevel, Realms, Realm } from '../../types';

export type StateProps = {
  realms: Realms
  fetchRealmLevel: FetchRealmLevel
  currentRealm: Realm | null
};

export type DispatchProps = {};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RealmList extends React.Component<Props> {
  renderRealm(realm: Realm, index: number) {
    const defaultRow = (
      <tr key={index}>
        <td>{realm.battlegroup}</td>
        <td>{realm.name}</td>
      </tr>
    );
    const { currentRealm } = this.props;
    if (currentRealm === null || currentRealm.slug !== realm.slug) {
      return defaultRow;
    }

    return (
      <tr key={index}>
        <th>{realm.battlegroup}</th>
        <th>{realm.name}</th>
      </tr>
    );
  }

  renderRealms() {
    const { realms } = this.props;
  
    return (
      <table className="pt-html-table">
        <thead>
          <tr>
            <th>Battlegroup</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(realms).map((realmSlug, index) => this.renderRealm(realms[realmSlug], index))}
        </tbody>
      </table>
    );
  }

  render() {
    switch (this.props.fetchRealmLevel) {
      case FetchRealmLevel.initial:
      case FetchRealmLevel.fetching:
        return <>Loading...</>;
      case FetchRealmLevel.failure:
        return <>Could not fetch realms!</>;
      case FetchRealmLevel.success:
        return this.renderRealms();
      default:
        return <>You should never see this!</>;
    }
  }
}
