import * as React from 'react';

import { Region } from '../types';

export type StateProps = {
  regions: Region[]
};

export type DispatchProps = {};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

const renderRegion = (region: Region) => {
  return (
    <tr>
      <td>{region.name}</td>
      <td>{region.hostname}</td>
    </tr>
  );
};

export class Regions extends React.Component<Props> {
  render() {
    if (this.props.regions.length === 0) {
      return <>No regions!</>;
    }

    return (
      <table className="pt-html-table">
        <thead>
          <th>Name</th>
          <th>Hostname</th>
        </thead>
        <tbody>
          {this.props.regions.map(renderRegion)}
        </tbody>
      </table>
    );
  }
}
