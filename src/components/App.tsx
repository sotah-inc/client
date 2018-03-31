import * as React from 'react';

import { AppLevel, Region } from '../types';
import { Regions } from '../components/Regions';

import './App.scss';

export type StateProps = {
  appLevel: AppLevel
  regions: Region[]
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
    const finishedLoading = prevProps.appLevel === AppLevel.connecting
      && this.props.appLevel === AppLevel.connectSuccess;
    if (!finishedLoading) {
      return;
    }

    this.props.refreshRegions();
  }

  renderConnected() {
    return (
      <>
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Sotah Client</div>
          </div>
        </nav>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <Regions regions={this.props.regions} />
          </div>
          <div className="pure-u-1-5">
            <p>Hello, world!</p>
          </div>
        </div>
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
      case AppLevel.connectSuccess:
        return this.renderConnected();
      default:
        return <>Invalid app level!</>;
    }
  }
}
