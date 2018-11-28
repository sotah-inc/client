import * as React from "react";

import { Card, H1, H4, Icon } from "@blueprintjs/core";

import "./News.scss";

export class News extends React.Component<{}> {
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
                        <div className="homepage-card">
                            <a href="/content/getting-started">
                                <Card interactive={true}>
                                    <Icon icon="star" iconSize={40} />
                                    <H4>Getting started</H4>
                                </Card>
                            </a>
                        </div>
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        <div className="homepage-card">
                            <a href="/content/getting-started">
                                <Card interactive={true}>
                                    <Icon icon="star" iconSize={40} />
                                    <H4>Getting started</H4>
                                </Card>
                            </a>
                        </div>
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        <div className="homepage-card">
                            <a href="/content/getting-started">
                                <Card interactive={true}>
                                    <Icon icon="star" iconSize={40} />
                                    <H4>Getting started</H4>
                                </Card>
                            </a>
                        </div>
                    </div>
                    <div className="pure-u-1-4 homepage-card-container">
                        <div className="homepage-card">
                            <a href="/content/getting-started">
                                <Card interactive={true}>
                                    <Icon icon="star" iconSize={40} />
                                    <H4>Getting started</H4>
                                </Card>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
