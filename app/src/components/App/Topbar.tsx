import { Alignment, ButtonGroup, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import Login from "@app/containers/App/Login";
import Register from "@app/containers/App/Register";
import LinkButton from "@app/route-containers/util/LinkButton";
import { IUser } from "@app/types/global";

export interface StateProps {
    user: IUser | null;
}

export interface DispatchProps {}

export interface OwnProps extends RouteComponentProps<Props> {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class Topbar extends React.Component<Props> {
    public renderUserInfo() {
        const { user } = this.props;
        if (user === null) {
            return (
                <ButtonGroup>
                    <Register />
                    <Login />
                </ButtonGroup>
            );
        }

        return <LinkButton icon="user" text="Profile" destination="/profile" />;
    }

    public render() {
        return (
            <>
                <Navbar className="pt-dark">
                    <div id="topbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>Sotah Client</NavbarHeading>
                            <NavbarDivider />
                            <ButtonGroup>
                                <LinkButton icon="home" text="Home" destination="/" />
                                <LinkButton icon="list" text="Auctions" destination="/auctions" />
                                <LinkButton icon="list" text="Price Lists" destination="/price-lists" />
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
