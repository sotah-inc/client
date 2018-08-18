import * as React from "react";

import { ActionBarContainer } from "@app/containers/App/PriceLists/ActionBar";
import { CreateEntryDialogContainer } from "@app/containers/App/PriceLists/CreateEntryDialog";
import { CreateListDialogContainer } from "@app/containers/App/PriceLists/CreateListDialog";
import { DeleteListDialogContainer } from "@app/containers/App/PriceLists/DeleteListDialog";
import { EditListDialogContainer } from "@app/containers/App/PriceLists/EditListDialog";
import { PricelistTreeContainer } from "@app/containers/App/PriceLists/Listing/PricelistTree";
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
        const { authLevel } = this.props;

        if (authLevel === AuthLevel.unauthenticated) {
            return (
                <>
                    <ActionBarContainer />
                    <PricelistTreeContainer />
                </>
            );
        }

        return (
            <>
                <CreateListDialogContainer />
                <CreateEntryDialogContainer />
                <EditListDialogContainer />
                <DeleteListDialogContainer />
                <ActionBarContainer />
                <PricelistTreeContainer />
            </>
        );
    }
}
