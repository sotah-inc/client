import * as React from 'react';

import { Region } from '../types';

type Props = {
  regions: Region[]
};

const renderRegion = (region: Region, index: number) => {
  return (
    <tr key={index}>
      <td>{region.name}</td>
      <td>{region.hostname}</td>
    </tr>
  );
};

export const Regions: React.SFC<Props> = (props: Props) => {
  if (props.regions.length === 0) {
    return <>No regions!</>;
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
        {props.regions.map((region, index) => renderRegion(region, index))}
      </tbody>
    </table>
  );
};
