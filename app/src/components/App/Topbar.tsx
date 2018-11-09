import * as React from "react";

import {
    Alignment,
    ButtonGroup,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Tooltip,
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

enum SubBarKind {
    Unknown,
    Content,
    Data,
}

export class Topbar extends React.Component<Props> {
    public render() {
        const contentLink = (() => {
            const out = (
                <LinkButtonRouteContainer
                    destination="/content"
                    buttonProps={{ icon: "manually-entered-data", text: "Content" }}
                    prefix={true}
                />
            );
            if (this.getSubBarKind() === SubBarKind.Content) {
                return out;
            }

            return (
                <Tooltip content="News, your personal feed" inheritDarkTheme={true}>
                    {out}
                </Tooltip>
            );
        })();
        const dataLink = (() => {
            const out = (
                <LinkButtonRouteContainer
                    destination="/data"
                    buttonProps={{ icon: "chart", text: "Data" }}
                    prefix={true}
                />
            );
            if (this.getSubBarKind() === SubBarKind.Data) {
                return out;
            }

            return (
                <Tooltip content="Auctions, professions" inheritDarkTheme={true}>
                    {out}
                </Tooltip>
            );
        })();

        return (
            <>
                <Navbar className={Classes.DARK}>
                    <div id="topbar">
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>Sotah Client</NavbarHeading>
                            <NavbarDivider />
                            {contentLink}
                            <NavbarDivider />
                            {dataLink}
                            <NavbarDivider />
                            {this.renderUserInfo()}
                        </NavbarGroup>
                    </div>
                </Navbar>
                {this.renderSubBar()}
            </>
        );
    }

    private renderSubBar() {
        if (this.getSubBarKind() === SubBarKind.Unknown) {
            return null;
        }

        return (
            <Navbar className={Classes.DARK}>
                <div id="subbar">
                    <NavbarGroup align={Alignment.LEFT}>{this.renderSubBarItems()}</NavbarGroup>
                </div>
            </Navbar>
        );
    }

    private getSubBarKind() {
        const { location } = this.props;

        if (location.pathname.startsWith("/content")) {
            return SubBarKind.Content;
        }

        if (location.pathname.startsWith("/data")) {
            return SubBarKind.Data;
        }

        return SubBarKind.Unknown;
    }

    private renderSubBarItems() {
        switch (this.getSubBarKind()) {
            case SubBarKind.Content:
                return (
                    <>
                        <LinkButtonRouteContainer
                            destination="/content/news"
                            buttonProps={{ icon: "globe-network", text: "News", minimal: true }}
                        />
                        <NavbarDivider />
                        <LinkButtonRouteContainer
                            destination="/content/feed"
                            buttonProps={{ icon: "feed", text: "Feed", minimal: true }}
                        />
                    </>
                );
            case SubBarKind.Data:
                return (
                    <>
                        <LinkButtonRouteContainer
                            destination="/data/auctions"
                            buttonProps={{ icon: "dollar", text: "Auctions", minimal: true }}
                        />
                        <NavbarDivider />
                        <LinkButtonRouteContainer
                            destination="/data/price-lists"
                            buttonProps={{ icon: "polygon-filter", text: "Professions", minimal: true }}
                        />
                    </>
                );
            default:
                return null;
        }
    }

    private renderUserInfo() {
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
}
