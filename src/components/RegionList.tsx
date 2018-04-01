import * as React from 'react';

import { Region, Regions } from '../types';

type Props = {
  regions: Regions
};

const renderRegion = (region: Region, index: number) => {
  return (
    <tr key={index}>
      <td>{region.name}</td>
      <td>{region.hostname}</td>
    </tr>
  );
};

export const RegionList: React.SFC<Props> = (props: Props) => {
  const { regions } = props;
  if (Object.keys(props.regions).length === 0) {
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
        {Object.keys(regions).map((regionName, index) => renderRegion(regions[regionName], index))}
      </tbody>
    </table>
  );
};
