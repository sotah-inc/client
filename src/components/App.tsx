import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

import { AppLevel, Regions } from '../types';
import { RegionList } from '../components/Regions';

import './App.scss';

export type StateProps = {
  appLevel: AppLevel
  regions: Regions
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
    switch (this.props.appLevel) {
      case AppLevel.connectSuccess:
        this.props.refreshRegions();

        return;
      default:
        return;
    }
  }

  renderConnected() {
    return (
      <>
        <Navbar className="pt-dark">
          <NavbarGroup>
            <NavbarHeading>Sotah Client</NavbarHeading>
          </NavbarGroup>
        </Navbar>
        <RegionList regions={this.props.regions} />
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
