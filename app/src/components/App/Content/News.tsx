import * as React from "react";

import { Card, H1, H4, Icon, IconName } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import "./News.scss";

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IOwnProps>;

export class News extends React.Component<Props> {
    public render() {
        document.title = "News - Sotah Client";

        return (
            <>
                <H1>
                    <Icon icon="globe" iconSize={35} /> Secrets of the Auction House
                </H1>
                <H4>
                    Sotah is a full-featured technical analysis application for the World of Warcraft Auction House.
                </H4>
                <p>It is optimized for users comparing markets and discovering competitors.</p>
                <div className="welcome pure-g">
                    <div className="pure-u-1-4 homepage-card-container">
                        {this.renderCard("/content/getting-started", "star", "Getting started")}
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        {this.renderCard("/content/getting-started", "star", "Getting started")}
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        {this.renderCard("/content/getting-started", "star", "Getting started")}
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        {this.renderCard("/content/getting-started", "star", "Getting started")}
                    </div>
                </div>
            </>
        );
    }

    private renderCard(dest: string, icon: IconName, label: string) {
        const { history } = this.props;

        return (
            <div className="homepage-card">
                <a onClick={() => history.push(dest)}>
                    <Card interactive={true}>
                        <Icon icon={icon} iconSize={40} />
                        <H4>{label}</H4>
                    </Card>
                </a>
            </div>
        );
    }
}
