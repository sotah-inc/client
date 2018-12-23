import * as React from "react";

import { ButtonGroup } from "@blueprintjs/core";
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
            return this.renderHomeButton();
        }

        return (
            <ButtonGroup>
                {this.renderHomeButton()}
                <LinkButtonRouteContainer
                    destination="/content/news/creator"
                    buttonProps={{ icon: "plus", minimal: true }}
                    prefix={true}
                />
            </ButtonGroup>
        );
    }

    private renderHomeButton() {
        return (
            <LinkButtonRouteContainer
                destination="/content/news"
                buttonProps={{ icon: "globe-network", text: "News", minimal: true }}
                prefix={true}
            />
        );
    }
}
