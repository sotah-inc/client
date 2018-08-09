import * as React from "react";

import { Intent } from "@blueprintjs/core";

import { ListDialog } from "@app/components/App/PriceLists/util/ListDialog";
import { IErrors, IProfile } from "@app/types/global";
import { IPricelist, IUpdatePricelistRequestOptions, MutatePricelistLevel } from "@app/types/price-lists";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isEditListDialogOpen: boolean;
    updatePricelistLevel: MutatePricelistLevel;
    updatePricelistErrors: IErrors;
    profile: IProfile | null;
    selectedList: IPricelist | null;
}

export interface IDispatchProps {
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    listDialogResetTrigger: number;
}>;

export class EditListDialog extends React.Component<Props, State> {
    public state = {
        listDialogResetTrigger: 0,
    };

    public componentDidUpdate(prevProps: Props) {
        const { updatePricelistLevel } = this.props;
        const { listDialogResetTrigger } = this.state;

        if (prevProps.updatePricelistLevel !== updatePricelistLevel) {
            switch (updatePricelistLevel) {
                case MutatePricelistLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been saved.",
                    });
                    this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });

                    break;
                default:
                    break;
            }
        }
    }

    public render() {
        const {
            isEditListDialogOpen,
            changeIsEditListDialogOpen,
            updatePricelistErrors,
            updatePricelistLevel,
            updatePricelist,
            profile,
            selectedList,
        } = this.props;
        const { listDialogResetTrigger } = this.state;

        return (
            <ListDialog
                isOpen={isEditListDialogOpen}
                onClose={() => changeIsEditListDialogOpen(!isEditListDialogOpen)}
                title="Edit Price List"
                mutationErrors={updatePricelistErrors}
                mutatePricelistLevel={updatePricelistLevel}
                resetTrigger={listDialogResetTrigger}
                onComplete={({ name, entries }) => {
                    updatePricelist({
                        meta: { isEditListDialogOpen: false },
                        request: { entries, pricelist: { ...selectedList!, name }, token: profile!.token },
                    });
                }}
            />
        );
    }
}
