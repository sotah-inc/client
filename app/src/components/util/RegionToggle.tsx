import * as React from "react";

import { Button, Classes, H6, Intent, Menu, MenuItem, Popover, Position, Spinner } from "@blueprintjs/core";

import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from "@app/api/user";
import { IRegion, IRegions } from "@app/types/global";
import { FetchRegionLevel } from "@app/types/main";

export interface IStateProps {
    currentRegion: IRegion | null;
    regions: IRegions;
    fetchRegionLevel: FetchRegionLevel;
}

export interface IDispatchProps {
    onRegionChange: (region: IRegion) => void;
    createUserPreferences: (token: string, body: ICreatePreferencesRequestBody) => void;
    updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class RegionToggle extends React.Component<Props> {
    public onMenuItemClick(region: IRegion) {
        const { onRegionChange } = this.props;
        return () => onRegionChange(region);
    }

    public renderMenuItem(region: IRegion, index: number) {
        let className = "";
        if (this.props.currentRegion !== null && region.name === this.props.currentRegion.name) {
            className = Classes.ACTIVE;
        }

        return (
            <MenuItem
                key={index}
                icon="geosearch"
                className={className}
                text={region.name.toUpperCase()}
                onClick={this.onMenuItemClick.bind(this, region)}
            />
        );
    }

    public renderMenu(regions: IRegions) {
        return (
            <Menu>
                <li>
                    <H6>Select Region</H6>
                </li>
                {Object.keys(regions).map((regionName, index) => this.renderMenuItem(regions[regionName], index))}
            </Menu>
        );
    }

    public render() {
        const { currentRegion, fetchRegionLevel } = this.props;

        switch (fetchRegionLevel) {
            case FetchRegionLevel.success:
                return (
                    <Popover
                        content={this.renderMenu(this.props.regions)}
                        target={<Button icon="double-caret-vertical">{currentRegion!.name.toUpperCase()}</Button>}
                        position={Position.BOTTOM_RIGHT}
                    />
                );
            case FetchRegionLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case FetchRegionLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case FetchRegionLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }
}
