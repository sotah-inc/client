import * as React from 'react';
import { Button, Popover, Position, Menu, MenuItem } from '@blueprintjs/core';

import { Region, Regions, RegionName } from '../../types';

type Props = {
  regions: Regions
  currentRegionName: RegionName
};

const renderMenuItem = (region: Region, index: number) => {
  return (
    <MenuItem icon="geosearch" text={region.name.toUpperCase()}/>
  );
};

const renderMenu = (regions: Regions) => {
  return (
    <Menu>
      <li>
        <h6>Select Region</h6>
      </li>
      {Object.keys(regions).map((regionName, index) => renderMenuItem(regions[regionName], index))}
    </Menu>
  );
};

export const RegionToggle: React.SFC<Props> = (props: Props) => {
  return (
    <Popover
      content={renderMenu(props.regions)}
      target={<Button icon="cog" className="pt-minimal" />}
      position={Position.BOTTOM_RIGHT}
    />
  );
};
