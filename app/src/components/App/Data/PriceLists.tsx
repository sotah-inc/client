import * as React from "react";

import { ActionBarContainer } from "@app/containers/App/Data/PriceLists/ActionBar";
import { CreateEntryDialogContainer } from "@app/containers/App/Data/PriceLists/CreateEntryDialog";
import { CreateListDialogContainer } from "@app/containers/App/Data/PriceLists/CreateListDialog";
import { DeleteListDialogContainer } from "@app/containers/App/Data/PriceLists/DeleteListDialog";
import { EditListDialogContainer } from "@app/containers/App/Data/PriceLists/EditListDialog";
import { PricelistTreeContainer } from "@app/containers/App/Data/PriceLists/PricelistTree";
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
