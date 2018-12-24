import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { IUserJson, UserLevel } from "@app/api-types/entities";
import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";
import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

export interface IStateProps {
    user: IUserJson | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IStateProps & IOwnProps>;

export class NewsCreator extends React.Component<Props> {
    public render() {
        const { user } = this.props;

        if (user === null || user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        return <PostFormFormContainer onComplete={v => console.log(v)} />;
    }
}
