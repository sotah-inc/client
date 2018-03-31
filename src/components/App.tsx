import * as React from 'react';

import { AppLevel } from '../types';
import Regions from '../containers/Regions';

export type StateProps = {
  appLevel: AppLevel
};

export type DispatchProps = {
  onLoad: () => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  renderConnected() {
    return (
      <>
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Sotah Client</div>
          </div>
        </nav>
        <p>Hello, world!</p>
        <Regions/>
      </>
    );
  }

  render() {
    const { appLevel } = this.props;
    switch (appLevel) {
      case AppLevel.initial:
        return <>Welcome!</>;
      case AppLevel.connecting:
        return <>Conneting...</>;
      case AppLevel.connectFailure:
        return <>Could not connect!</>;
      case AppLevel.connectSuccess:
        return this.renderConnected();
      default:
        return <>Invalid app level!</>;
    }
  }
}
