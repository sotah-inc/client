import * as React from "react";

import { Alignment, ButtonGroup, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUserJson } from "@app/api-types/entities";
import { LoginContainer } from "@app/containers/App/Login";
import { RegisterContainer } from "@app/containers/App/Register";
import { LinkButtonRouteContainer } from "@app/route-containers/util/LinkButton";

export interface IStateProps {
    user: IUserJson | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IOwnProps>;

export class Topbar extends React.Component<Props> {
    public renderUserInfo() {
        const { user } = this.props;
        if (user === null) {
            return (
                <ButtonGroup>
                    <RegisterContainer />
                    <LoginContainer />
                </ButtonGroup>
            );
        }

        return <LinkButtonRouteContainer icon="user" text="Profile" destination="/profile" />;
    }

    public render() {
        return (
            <>
                <Navbar className={Classes.DARK}>
                    <div id="topbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>Sotah Client</NavbarHeading>
                            <NavbarDivider />
                            <ButtonGroup>
                                <LinkButtonRouteContainer icon="home" text="Home" destination="/" />
                                <LinkButtonRouteContainer icon="list" text="Auctions" destination="/auctions" />
                                <LinkButtonRouteContainer icon="list" text="Price Lists" destination="/price-lists" />
                            </ButtonGroup>
                            <NavbarDivider />
                            {this.renderUserInfo()}
                        </NavbarGroup>
                    </div>
                </Navbar>
            </>
        );
    }
}
