import * as React from 'react';
import { Button, Popover, Position, Menu, MenuItem } from '@blueprintjs/core';

export type StateProps = {
  auctionsPerPage: number
};

export type DispatchProps = {
  onCountChange: (count: number) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class CountToggle extends React.Component<Props> {
  renderMenuItem(count: number, index: number) {
    let className = '';
    if (this.props.auctionsPerPage === count) {
      className = 'pt-active';
    }

    return (
      <MenuItem
        key={index}
        className={className}
        text={`${count} results`}
        onClick={() => this.props.onCountChange(count)}
      />
    );
  }

  renderMenu() {
    const counts: number[] = [10, 50, 100];
    return (
      <Menu>
        <li>
          <h6>Results Per Page</h6>
        </li>
        {counts.map((count, index) => this.renderMenuItem(count, index))}
      </Menu>
    );
  }

  render() {
    const { auctionsPerPage } = this.props;

    return (
      <Popover
        content={this.renderMenu()}
        target={<Button icon="double-caret-vertical">{auctionsPerPage} results</Button>}
        position={Position.BOTTOM_LEFT}
      />
    );
  }
}
