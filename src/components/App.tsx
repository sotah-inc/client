import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, Alignment, Spinner } from '@blueprintjs/core';

import { AppLevel, Regions, RegionName } from '../types';
import { RegionList } from '../components/RegionList';
import RegionToggle from '../containers/App/RegionToggle';

import './App.scss';

export type StateProps = {
  appLevel: AppLevel
  regions: Regions
  currentRegionName: RegionName | null
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

  componentDidUpdate(prevProps: Props) {
    const props = this.props;

    if (props.currentRegionName !== null) {
      if (props.currentRegionName !== prevProps.currentRegionName) {
        console.log(props.currentRegionName);
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

  renderRegionToggle(regions: Regions, currentRegionName: RegionName | null) {
    if (currentRegionName === null) {
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
    const { regions, currentRegionName } = this.props;

    return (
      <>
        <Navbar className="pt-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Sotah Client</NavbarHeading>
          </NavbarGroup>
          {this.renderRegionToggle(regions, currentRegionName)}
        </Navbar>
        <RegionList regions={regions}/>
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
