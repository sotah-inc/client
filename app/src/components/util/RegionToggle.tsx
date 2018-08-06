import { Button, Intent, Menu, MenuItem, Popover, Position, Spinner } from "@blueprintjs/core";
import * as React from "react";

import { ICreatePreferencesRequestBody, UpdatePreferencesRequestBody } from "@app/api/user";
import { IRegion, IRegions } from "@app/types/global";
import { FetchRegionLevel } from "@app/types/main";

export interface StateProps {
    currentRegion: IRegion | null;
    regions: IRegions;
    fetchRegionLevel: FetchRegionLevel;
}

export interface DispatchProps {
    onRegionChange: (region: IRegion) => void;
    createUserPreferences: (token: string, body: ICreatePreferencesRequestBody) => void;
    updateUserPreferences: (token: string, body: UpdatePreferencesRequestBody) => void;
}

export interface OwnProps {}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class RegionToggle extends React.Component<Props> {
    public renderMenuItem(region: IRegion, index: number) {
        let className = "";
        if (this.props.currentRegion !== null && region.name === this.props.currentRegion.name) {
            className = "pt-active";
        }

        return (
            <MenuItem
                key={index}
                icon="geosearch"
                className={className}
                text={region.name.toUpperCase()}
                onClick={() => this.props.onRegionChange(region)}
            />
        );
    }

    public renderMenu(regions: IRegions) {
        return (
            <Menu>
                <li>
                    <h6>Select Region</h6>
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
                return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
            case FetchRegionLevel.initial:
                return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
            case FetchRegionLevel.fetching:
            default:
                return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
        }
    }
}
