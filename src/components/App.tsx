import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, Alignment, Spinner } from '@blueprintjs/core';

import { AppLevel, Regions, Region } from '../types';
import RealmList from '../containers/App/RealmList';
import RegionToggle from '../containers/App/RegionToggle';

import './App.scss';

export type StateProps = {
  appLevel: AppLevel
  regions: Regions
  currentRegion: Region | null
};

export type DispatchProps = {
  onLoad: () => void
  refreshRegions: () => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  onRegionChange(region: Region) {
    return;
  }

  componentDidUpdate(prevProps: Props) {
    const props = this.props;

    if (props.currentRegion !== null) {
      if (props.currentRegion !== prevProps.currentRegion) {
        this.onRegionChange(props.currentRegion);
      }
    }

    switch (props.appLevel) {
      case AppLevel.connectSuccess:
        this.props.refreshRegions();

        break;
      default:
        break;
    }
  }

  renderRegionToggle(regions: Regions, currentRegion: Region | null) {
    if (currentRegion === null) {
      return (
        <NavbarGroup align={Alignment.RIGHT}>
          <Spinner className="pt-small"/>
        </NavbarGroup>
      );
    }

    return (
      <NavbarGroup align={Alignment.RIGHT}>
        <RegionToggle/>
      </NavbarGroup>
    );
  }

  renderConnected() {
    const { regions, currentRegion } = this.props;

    return (
      <>
        <Navbar className="pt-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Sotah Client</NavbarHeading>
          </NavbarGroup>
          {this.renderRegionToggle(regions, currentRegion)}
        </Navbar>
        <RealmList/>
      </>
    );
  }

  render() {
    const { appLevel } = this.props;
    switch (appLevel) {
      case AppLevel.initial:
        return <>Welcome!</>;
      case AppLevel.connecting:
        return <>Connecting...</>;
      case AppLevel.connectFailure:
        return <>Could not connect!</>;
      case AppLevel.fetchingRegions:
        return <>Fetching regions...</>;
      case AppLevel.fetchRegionFailure:
        return <>Could not fetch regions!</>;
      case AppLevel.fetchRegionSuccess:
        return this.renderConnected();
      default:
        return <>Invalid app level!</>;
    }
  }
}
