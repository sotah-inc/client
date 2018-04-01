import * as React from 'react';
import { Button, Popover, Position, Menu, MenuItem } from '@blueprintjs/core';

import { Region, Regions, RegionName } from '../../types';

export type StateProps = {
  currentRegionName: RegionName | null
  regions: Regions
};

export type DispatchProps = {
  onRegionChange: (regionName: RegionName) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RegionToggle extends React.Component<Props> {
  renderMenuItem(region: Region, index: number) {
    let className = '';
    if (region.name === this.props.currentRegionName) {
      className = 'pt-active';
    }

    return (
      <MenuItem
        key={index}
        icon="geosearch"
        className={className}
        text={region.name.toUpperCase()}
        onClick={() => this.props.onRegionChange(region.name)}
      />
    );
  }

  renderMenu(regions: Regions) {
    return (
      <Menu>
        <li>
          <h6>Select Region</h6>
        </li>
        {Object.keys(regions).map(
          (regionName, index) => this.renderMenuItem(regions[regionName], index)
        )}
      </Menu>
    );
  }

  render() {
    return (
      <Popover
        content={this.renderMenu(this.props.regions)}
        target={<Button icon="cog" className="pt-minimal" />}
        position={Position.BOTTOM_RIGHT}
      />
    );
  }
}
