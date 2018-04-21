import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames, IconName } from '@blueprintjs/icons';

import { SortDirection, SortKind, SortChangeOptions } from '@app/types/auction';

export type StateProps = {
  currentSortDirection: SortDirection
  currentSortKind: SortKind
};

type OnChangeCb = (payload: SortChangeOptions) => void;

export type DispatchProps = {
  onChange: OnChangeCb
};

export type OwnProps = {
  label: string
  sortKind: SortKind
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class SortToggle extends React.Component<Props> {
  onToggle(sortKind: SortKind) {
    const { currentSortDirection, currentSortKind } = this.props;

    let sortDirection = SortDirection.up;
    if (currentSortKind === sortKind) {
      if (currentSortDirection === SortDirection.up) {
        sortDirection = SortDirection.down;
      } else if (currentSortDirection === SortDirection.down) {
        sortDirection = SortDirection.none;
      }
    }

    this.props.onChange({ sortKind, sortDirection });

    return;
  }

  renderButton(icon: IconName | null) {
    const { label, sortKind } = this.props;

    if (icon === null) {
      return (
        <Button
          className="pt-small pt-minimal"
          text={label}
          onClick={() => this.onToggle(sortKind)}
        />
      );
    }

    return (
      <Button
        className="pt-small pt-minimal"
        text={label}
        icon={icon}
        onClick={() => this.onToggle(sortKind)}
      />
    );
  }

  render() {
    const { sortKind, currentSortDirection, currentSortKind } = this.props;

    let icon: IconName | null = null;
    if (currentSortKind === sortKind) {
      switch (currentSortDirection) {
        case SortDirection.up:
          icon = IconNames.SORT_ASC;

          break;
        case SortDirection.down:
          icon = IconNames.SORT_DESC;

          break;
        default:
          break;
      }
    }

    return this.renderButton(icon);
  }
}
