import * as React from 'react';

export type StateProps = {
};

export type DispatchProps = {};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  render() {
    return (
      <p>Hello, world!</p>
    );
  }
}