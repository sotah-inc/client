import * as React from "react";

import {
    Alignment,
    ButtonGroup,
    Classes,
    Icon,
    IconName,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Tooltip,
} from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUserJson } from "@app/api-types/entities";
import { IRealm, IRegion } from "@app/api-types/region";
import { LoginContainer } from "@app/containers/App/Login";
import { RegisterContainer } from "@app/containers/App/Register";
import { NewsButtonRouteContainer } from "@app/route-containers/App/Topbar/NewsButton";
import { LinkButtonRouteContainer } from "@app/route-containers/util/LinkButton";

export interface IStateProps {
    user: IUserJson | null;
    currentRealm: IRealm | null;
    currentRegion: IRegion | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IOwnProps>;

enum SubBarKind {
    Unknown,
    Content,
    Data,
    Profile,
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
                            <NavbarHeading>
                                <Icon icon="globe" />
                                <span style={{ marginLeft: "5px" }}>SotAH</span>
                            </NavbarHeading>
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

        if (location.pathname.startsWith("/profile")) {
            return SubBarKind.Profile;
        }

        return SubBarKind.Unknown;
    }

    private renderSubBarItems() {
        switch (this.getSubBarKind()) {
            case SubBarKind.Content:
                return (
                    <>
                        <NewsButtonRouteContainer />
                        <NavbarDivider />
                        <LinkButtonRouteContainer
                            destination="/content/getting-started"
                            buttonProps={{ icon: "star", text: "Getting started", minimal: true }}
                        />
                        <NavbarDivider />
                        <LinkButtonRouteContainer
                            destination="/content/feed"
                            buttonProps={{ icon: "feed", text: "Feed", minimal: true }}
                        />
                    </>
                );
            case SubBarKind.Data:
                return this.renderDataSubBar();
            case SubBarKind.Profile:
                return this.renderProfileSubBar();
            default:
                return null;
        }
    }

    private renderProfileSubBar() {
        return this.renderManageAccountButton();
    }

    private renderManageAccountButton() {
        const { user } = this.props;

        if (user === null) {
            return (
                <LinkButtonRouteContainer
                    destination={""}
                    buttonProps={{ icon: "cog", text: "Manage Account", minimal: true, disabled: true }}
                />
            );
        }

        return (
            <LinkButtonRouteContainer
                destination="/profile/manage-account"
                buttonProps={{ icon: "cog", text: "Manage Account", minimal: true }}
            />
        );
    }

    private renderDataSubBar() {
        return (
            <>
                {this.renderRegionRealmButton("/auctions", "dollar", "Auctions")}
                <NavbarDivider />
                {this.renderRegionRealmButton("/professions", "polygon-filter", "Professions")}
            </>
        );
    }

    private renderRegionRealmButton(destination: string, icon: IconName, text: string) {
        const { currentRegion, currentRealm } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return (
                <LinkButtonRouteContainer
                    destination={""}
                    buttonProps={{ icon, text, minimal: true, disabled: true }}
                    prefix={true}
                />
            );
        }

        return (
            <LinkButtonRouteContainer
                destination={`/data/${currentRegion.name}/${currentRealm.slug}${destination}`}
                buttonProps={{ icon, text, minimal: true }}
                prefix={true}
            />
        );
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

        return (
            <LinkButtonRouteContainer
                destination="/profile"
                buttonProps={{ icon: "user", text: "Profile" }}
                prefix={true}
            />
        );
    }
}
