import * as React from 'react';

import { Realms, Realm } from '../../types';

export type StateProps = {
  realms: Realms
};

export type DispatchProps = {};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RealmList extends React.Component<Props> {
  renderRealm(realm: Realm, index: number) {
    return (
      <tr key={index}>
        <td>{realm.battlegroup}</td>
        <td>{realm.name}</td>
      </tr>
    );
  }

  render() {
    const { realms } = this.props;
    if (Object.keys(realms).length === 0) {
      return <>No realms!</>;
    }
  
    return (
      <table className="pt-html-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hostname</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(realms).map((realmSlug, index) => this.renderRealm(realms[realmSlug], index))}
        </tbody>
      </table>
    );
  }
}
