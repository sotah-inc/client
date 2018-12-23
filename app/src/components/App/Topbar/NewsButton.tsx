import * as React from "react";

import { Button, ButtonGroup, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUserJson, UserLevel } from "@app/api-types/entities";
import { LinkButtonRouteContainer } from "@app/route-containers/util/LinkButton";

export interface IStateProps {
    user: IUserJson | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IOwnProps>;

export class NewsButton extends React.Component<Props> {
    public render() {
        const { user } = this.props;

        if (user === null || user.level < UserLevel.Admin) {
            return (
                <LinkButtonRouteContainer
                    destination="/content/news"
                    buttonProps={{ icon: "globe-network", text: "News", minimal: true }}
                />
            );
        }

        return (
            <ButtonGroup>
                <LinkButtonRouteContainer
                    destination="/content/news"
                    buttonProps={{ icon: "globe-network", text: "News", minimal: true }}
                />
                <Popover content={this.renderMenu()} target={<Button icon="chevron-down" minimal={true} />} />
            </ButtonGroup>
        );
    }

    private renderMenu() {
        return (
            <Menu>
                <MenuItem icon="plus" text="Add" />
            </Menu>
        );
    }
}
