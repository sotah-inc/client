import * as React from "react";

import { Button, Classes } from "@blueprintjs/core";
import { IconName, IconNames } from "@blueprintjs/icons";

import { ISortChangeOptions, SortDirection, SortKind } from "@app/types/auction";

export interface IStateProps {
    currentSortDirection: SortDirection;
    currentSortKind: SortKind;
}

type OnChangeCb = (payload: ISortChangeOptions) => void;

export interface IDispatchProps {
    onChange: OnChangeCb;
}

export interface IOwnProps {
    label: string;
    sortKind: SortKind;
}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class SortToggle extends React.Component<Props> {
    public onToggle(sortKind: SortKind) {
        const { currentSortDirection, currentSortKind, onChange } = this.props;

        let sortDirection = SortDirection.up;
        if (currentSortKind === sortKind) {
            if (currentSortDirection === SortDirection.up) {
                sortDirection = SortDirection.down;
            } else if (currentSortDirection === SortDirection.down) {
                sortDirection = SortDirection.none;
            }
        }

        onChange({ sortKind, sortDirection });

        return;
    }

    public renderButton(icon: IconName | null) {
        const { label, sortKind } = this.props;

        if (icon === null) {
            return (
                <Button
                    className={`${Classes.SMALL} ${Classes.MINIMAL}`}
                    text={label}
                    onClick={() => this.onToggle(sortKind)}
                />
            );
        }

        return (
            <Button
                className={`${Classes.SMALL} ${Classes.MINIMAL}`}
                text={label}
                icon={icon}
                onClick={() => this.onToggle(sortKind)}
            />
        );
    }

    public render() {
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
