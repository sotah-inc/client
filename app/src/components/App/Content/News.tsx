import * as React from "react";

import { Classes, H1, H4, Icon, IconName, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IRegion } from "@app/api-types/region";
import { CardCallout } from "@app/components/util";
import { DeletePostDialogRouteContainer } from "@app/route-containers/App/Content/DeletePostDialog";
import { PostListRouteContainer } from "@app/route-containers/App/Content/PostList";
import { AuthLevel } from "@app/types/main";
import { setTitle } from "@app/util";

import "./News.scss";

export interface IStateProps {
    currentRegion: IRegion | null;
    authLevel: AuthLevel;
}

export interface IDispatchProps {
    changeIsRegisterDialogOpen: (isOpen: boolean) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IOwnProps & IStateProps & IDispatchProps>;

export class News extends React.Component<Props> {
    public componentDidMount() {
        setTitle("News");
    }

    public render() {
        const { currentRegion } = this.props;

        if (currentRegion === null) {
            return (
                <NonIdealState
                    title="Loading region"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                />
            );
        }

        return (
            <>
                <DeletePostDialogRouteContainer />
                <div className="pure-g">
                    <div className="pure-u-3-4">
                        <H1>
                            <Icon icon="globe" iconSize={35} /> Secrets of the Auction House
                        </H1>
                        <H4>
                            SotAH is a full-featured technical analysis application for the World of Warcraft Auction
                            House.
                        </H4>
                        <p>It is optimized for users comparing markets and discovering competitors.</p>
                        <div className="welcome pure-g">
                            <div className="pure-u-1-4 homepage-card-container">
                                {this.renderCard("/content/getting-started", "star", "Getting Started")}
                            </div>
                            <div className="pure-u-1-4 homepage-card-container">
                                {this.renderCard(`/data/auctions/${currentRegion.name}`, "dollar", "Browse Auctions")}
                            </div>
                            <div className="pure-u-1-4 homepage-card-container">
                                {this.renderCard(
                                    `/data/professions/${currentRegion.name}`,
                                    "chart",
                                    "Discover Professions",
                                )}
                            </div>
                            {this.renderUserCallout()}
                        </div>
                        <PostListRouteContainer />
                    </div>
                    <div className="pure-u-1-4">&nbsp;</div>
                </div>
            </>
        );
    }

    private renderCard(dest: string, icon: IconName, label: string) {
        const { history } = this.props;

        return <CardCallout onClick={() => history.push(dest)} icon={icon} label={label} />;
    }

    private renderUserCallout() {
        const { changeIsRegisterDialogOpen, authLevel } = this.props;

        if (authLevel === AuthLevel.authenticated) {
            return (
                <div className="pure-u-1-4 homepage-card-container">
                    {this.renderCard(`/content/feed`, "feed", "Check Your Feed")}
                </div>
            );
        }

        return (
            <div className="pure-u-1-4 homepage-card-container">
                <CardCallout onClick={() => changeIsRegisterDialogOpen(true)} icon="user" label="Create Account" />
            </div>
        );
    }
}
