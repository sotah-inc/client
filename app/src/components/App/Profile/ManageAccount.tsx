import * as React from "react";

import { Classes, H1, H2, Icon, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
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
                        <H1>
                            <Icon icon="globe" iconSize={35} /> Secrets of the Auction House
                        </H1>
                        <H2 style={{ margin: 0 }}>Hello {user.email}</H2>
                        <p>Hello, world!</p>
                    </div>
                    <div className="pure-u-1-4">&nbsp;</div>
                </div>
            </>
        );
    }
}
