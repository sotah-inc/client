import * as React from "react";

import { Breadcrumbs, Classes, H2, IBreadcrumbProps, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUserJson } from "@app/api-types/entities";
import { IFormValues } from "@app/components/App/Profile/ManageAccountForm";
import { ManageAccountFormFormContainer } from "@app/form-containers/App/Profile/ManageAccountForm";
import { IErrors } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    user: IUserJson | null;
    updateProfileLevel: FetchLevel;
    updateProfileErrors: IErrors;
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
                <H2>Manage Account</H2>
                {this.renderBreadcrumbs()}
                <ManageAccountFormFormContainer
                    defaultFormValues={{ email: user.email }}
                    onComplete={() => {
                        console.log("wew lad");
                    }}
                    onFatalError={err => {
                        AppToaster.show({
                            icon: "warning-sign",
                            intent: "danger",
                            message: `Could not create post: ${err}`,
                        });
                    }}
                    onSubmit={(v: IFormValues) => {
                        console.log("wew lad", v);
                    }}
                    updateProfileErrors={{}}
                    updateProfileLevel={FetchLevel.initial}
                />
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
