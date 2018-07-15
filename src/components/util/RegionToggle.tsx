import * as React from 'react';
import { Spinner, Button, Popover, Position, Menu, MenuItem, Intent } from '@blueprintjs/core';

import { Region, Regions, UserPreferences, Profile } from '@app/types/global';
import { FetchRegionLevel, AuthLevel } from '@app/types/main';
import { CreatePreferencesRequestBody, UpdatePreferencesRequestBody } from '@app/api/user';
import { didRegionChange } from '@app/util';

export type StateProps = {
  currentRegion: Region | null
  regions: Regions
  fetchRegionLevel: FetchRegionLevel
  userPreferences: UserPreferences | null
  authLevel: AuthLevel
  profile: Profile | null
};

export type DispatchProps = {
  onRegionChange: (region: Region) => void
  createUserPreferences: (token: string, body: CreatePreferencesRequestBody) => void
  updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RegionToggle extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const {
      currentRegion,
      authLevel,
      userPreferences,
      profile,
      createUserPreferences,
      updateUserPreferences
    } = this.props;

    if (currentRegion !== null) {
      if (didRegionChange(prevProps.currentRegion, currentRegion)) {
        if (authLevel === AuthLevel.authenticated) {
          if (userPreferences === null) {
            createUserPreferences(profile!.token, { current_region: currentRegion.name });
          } else {
            updateUserPreferences(profile!.token, {  current_region: currentRegion.name });
          }
        }
      }
    }
  }

  renderMenuItem(region: Region, index: number) {
    let className = '';
    if (this.props.currentRegion !== null && region.name === this.props.currentRegion.name) {
      className = 'pt-active';
    }

    return (
      <MenuItem
        key={index}
        icon="geosearch"
        className={className}
        text={region.name.toUpperCase()}
        onClick={() => this.props.onRegionChange(region)}
      />
    );
  }

  renderMenu(regions: Regions) {
    return (
      <Menu>
        <li>
          <h6>Select Region</h6>
        </li>
        {Object.keys(regions).map((regionName, index) => this.renderMenuItem(regions[regionName], index))}
      </Menu>
    );
  }

  render() {
    const { currentRegion, fetchRegionLevel } = this.props;

    switch (fetchRegionLevel) {
      case FetchRegionLevel.success:
        return (
          <Popover
            content={this.renderMenu(this.props.regions)}
            target={<Button icon="double-caret-vertical">{currentRegion!.name.toUpperCase()}</Button>}
            position={Position.BOTTOM_RIGHT}
          />
        );
      case FetchRegionLevel.failure:
        return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
      case FetchRegionLevel.initial:
        return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
      case FetchRegionLevel.fetching:
      default:
        return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
    }
  }
}
