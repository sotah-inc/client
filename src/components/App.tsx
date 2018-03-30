import * as React from 'react';

import Regions from '../containers/Regions';

export type StateProps = {};

export type DispatchProps = {
  onLoad: () => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
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
}
