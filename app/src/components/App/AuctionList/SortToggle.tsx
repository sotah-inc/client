import { Button } from "@blueprintjs/core";
import { IconName, IconNames } from "@blueprintjs/icons";
import * as React from "react";

import { ISortChangeOptions, SortDirection, SortKind } from "@app/types/auction";

export interface StateProps {
    currentSortDirection: SortDirection;
    currentSortKind: SortKind;
}

type OnChangeCb = (payload: ISortChangeOptions) => void;

export interface DispatchProps {
    onChange: OnChangeCb;
}

export interface OwnProps {
    label: string;
    sortKind: SortKind;
}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class SortToggle extends React.Component<Props> {
    public onToggle(sortKind: SortKind) {
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

    public renderButton(icon: IconName | null) {
        const { label, sortKind } = this.props;

        if (icon === null) {
            return <Button className="pt-small pt-minimal" text={label} onClick={() => this.onToggle(sortKind)} />;
        }

        return (
            <Button className="pt-small pt-minimal" text={label} icon={icon} onClick={() => this.onToggle(sortKind)} />
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
