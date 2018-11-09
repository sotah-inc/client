import * as React from "react";

import {
    Alignment,
    Button,
    ButtonGroup,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
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

        return <LinkButtonRouteContainer destination="/profile" buttonProps={{ icon: "user", text: "Profile" }} />;
    }

    public render() {
        return (
            <>
                <Navbar className={Classes.DARK}>
                    <div id="topbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>Sotah Client</NavbarHeading>
                            <NavbarDivider />
                            <LinkButtonRouteContainer
                                destination="/content"
                                buttonProps={{ icon: "manually-entered-data", text: "Content" }}
                            />
                            <NavbarDivider />
                            <Button icon="chart">Data</Button>
                            <NavbarDivider />
                            <ButtonGroup>
                                <LinkButtonRouteContainer
                                    destination="/"
                                    buttonProps={{ icon: "home", text: "Home" }}
                                />
                                <LinkButtonRouteContainer
                                    destination="/auctions"
                                    buttonProps={{ icon: "list", text: "Auctions" }}
                                />
                                <LinkButtonRouteContainer
                                    destination="/price-lists"
                                    buttonProps={{ icon: "list", text: "Price Lists" }}
                                />
                            </ButtonGroup>
                            <NavbarDivider />
                            {this.renderUserInfo()}
                        </NavbarGroup>
                    </div>
                </Navbar>
                <Navbar className={Classes.DARK}>
                    <div id="topbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <LinkButtonRouteContainer
                                destination="/content/news"
                                buttonProps={{ icon: "globe-network", text: "News", minimal: true }}
                            />
                            <NavbarDivider />
                            <LinkButtonRouteContainer
                                destination="/content/feed"
                                buttonProps={{ icon: "feed", text: "Feed", minimal: true }}
                            />
                        </NavbarGroup>
                    </div>
                </Navbar>
            </>
        );
    }
}
