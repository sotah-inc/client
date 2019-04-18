import * as React from "react";

import { Breadcrumbs, Classes, H2, IBreadcrumbProps, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUserJson } from "@app/api-types/entities";
import { setTitle } from "@app/util";

export interface IStateProps {
    user: IUserJson | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IOwnProps & IStateProps>;

export class ManageAccount extends React.Component<Props> {
    public componentDidMount() {
        setTitle("Profile");
    }

    public render() {
        const { user } = this.props;

        if (user === null) {
            return (
                <NonIdealState
                    title="Unauthorized"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                    description={"You must be logged in to view this page!"}
                />
            );
        }

        return (
            <>
                <div className="pure-g">
                    <div className="pure-u-3-4">
                        <H2>Manage Account</H2>
                        {this.renderBreadcrumbs()}
                        <p>Hello, world!</p>
                    </div>
                    <div className="pure-u-1-4">&nbsp;</div>
                </div>
            </>
        );
    }

    private renderBreadcrumbs() {
        const { history } = this.props;

        const breadcrumbs: IBreadcrumbProps[] = [
            {
                href: "/",
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();

                    history.push("/");
                },
                text: "Home",
            },
            {
                href: "/profile",
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();

                    history.push("/profile");
                },
                text: "Profile",
            },
            {
                text: "Manage Account",
            },
        ];

        return (
            <div style={{ marginBottom: "10px" }}>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        );
    }
}
