import * as React from "react";

import { Button, NonIdealState } from "@blueprintjs/core";

import { ActionBarContainer } from "@app/containers/App/PriceLists/ActionBar";
import { CreateEntryDialogContainer } from "@app/containers/App/PriceLists/CreateEntryDialog";
import { CreateListDialogContainer } from "@app/containers/App/PriceLists/CreateListDialog";
import { DeleteListDialogContainer } from "@app/containers/App/PriceLists/DeleteListDialog";
import { EditListDialogContainer } from "@app/containers/App/PriceLists/EditListDialog";
import { ListingContainer } from "@app/containers/App/PriceLists/Listing";
import { AuthLevel } from "@app/types/main";

import "./PriceLists.scss";

export interface IStateProps {
    authLevel: AuthLevel;
}

export interface IDispatchProps {
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class PriceLists extends React.Component<Props> {
    public render() {
        const { authLevel, changeIsLoginDialogOpen } = this.props;

        if (authLevel !== AuthLevel.authenticated) {
            return (
                <NonIdealState
                    title="Unauthenticated"
                    description="Please log in to use price-lists."
                    icon="list"
                    action={
                        <Button
                            onClick={() => changeIsLoginDialogOpen(true)}
                            type="button"
                            icon="log-in"
                            text="Login"
                        />
                    }
                />
            );
        }

        return (
            <>
                <CreateListDialogContainer />
                <CreateEntryDialogContainer />
                <EditListDialogContainer />
                <DeleteListDialogContainer />
                <ActionBarContainer />
                <ListingContainer />
            </>
        );
    }
}
