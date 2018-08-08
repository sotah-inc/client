import * as React from "react";

import { Button, Classes, Dialog, HTMLTable, Intent } from "@blueprintjs/core";

import { ICreatePricelistRequest } from "@app/api/price-lists";
import { DialogActions, DialogBody, ErrorList, PanelHeader } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { ListFormFormContainer } from "@app/form-containers/App/PriceLists/util/ListForm";
import { IErrors, IProfile, IRealm, IRegion, Item, ItemClasses, ItemsMap } from "@app/types/global";
import { CreateListCompletion, CreateListStep, IPricelistEntry, MutatePricelistLevel } from "@app/types/price-lists";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isAddListDialogOpen: boolean;
    itemClasses: ItemClasses;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    createPricelistLevel: MutatePricelistLevel;
    createPricelistErrors: IErrors;
    profile: IProfile | null;
}

export interface IDispatchProps {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    createPricelist: (token: string, request: ICreatePricelistRequest) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    createListStep: CreateListStep;
    listName: string;
    createListCompletion: CreateListCompletion;
    entries: IPricelistEntry[];
    entriesItems: ItemsMap;
}>;

export class CreateListDialog extends React.Component<Props, State> {
    public state = {
        createListCompletion: CreateListCompletion.initial,
        createListStep: CreateListStep.list,
        entries: [],
        entriesItems: {},
        listName: "",
    };

    public componentDidUpdate(prevProps: Props) {
        const { createPricelistLevel } = this.props;

        if (prevProps.createPricelistLevel !== createPricelistLevel) {
            switch (createPricelistLevel) {
                case MutatePricelistLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been created.",
                    });
                    this.setState({
                        createListCompletion: CreateListCompletion.initial,
                        createListStep: CreateListStep.list,
                        entries: [],
                        entriesItems: {},
                        listName: "",
                    });

                    break;
                default:
                    break;
            }
        }
    }

    public render() {
        const { isAddListDialogOpen, changeIsAddListDialogOpen } = this.props;

        return (
            <Dialog
                isOpen={isAddListDialogOpen}
                onClose={() => changeIsAddListDialogOpen(!isAddListDialogOpen)}
                title="New Price List"
                icon="manually-entered-data"
                canOutsideClickClose={false}
            >
                {this.renderCreateListForm()}
                {this.renderCreateEntriesForm()}
                {this.renderFinish()}
            </Dialog>
        );
    }

    private onNavClick(createListStep: CreateListStep) {
        this.setState({ createListStep });
    }

    private renderNavHeader() {
        const { createListStep } = this.state;

        switch (createListStep) {
            case CreateListStep.list:
                return <PanelHeader title="List" />;
            case CreateListStep.entry:
                return (
                    <PanelHeader
                        title="Entry"
                        prev={{ onClick: () => this.onNavClick(CreateListStep.list), title: "List" }}
                    />
                );
            case CreateListStep.finish:
                return (
                    <PanelHeader
                        title="Finish"
                        prev={{ onClick: () => this.onNavClick(CreateListStep.entry), title: "List" }}
                    />
                );
            default:
                return;
        }
    }

    private renderNav() {
        return (
            <div className={Classes.PANEL_STACK_HEADER} style={{ marginBottom: "10px" }}>
                {this.renderNavHeader()}
            </div>
        );
    }

    private onCreateListFormComplete(name: string) {
        let createListCompletion = CreateListCompletion.list;
        if (this.state.createListCompletion > createListCompletion) {
            createListCompletion = this.state.createListCompletion;
        }

        this.setState({
            createListCompletion,
            createListStep: CreateListStep.entry,
            listName: name,
        });
    }

    private renderCreateListForm() {
        const { createListStep } = this.state;

        if (createListStep !== CreateListStep.list) {
            return;
        }

        return (
            <ListFormFormContainer
                onComplete={v => this.onCreateListFormComplete(v)}
                submitIcon="caret-right"
                submitText="Next"
            >
                {this.renderNav()}
            </ListFormFormContainer>
        );
    }

    private onCreateEntryFormComplete(v: IPricelistEntry, item: Item) {
        const entriesItems = this.state.entriesItems;
        entriesItems[item.id] = item;
        this.setState({ entriesItems: { ...entriesItems } });

        this.setState({
            createListCompletion: CreateListCompletion.entry,
            createListStep: CreateListStep.finish,
            entries: [...this.state.entries, v],
        });
    }

    private renderCreateEntriesForm() {
        const { createListStep } = this.state;

        if (createListStep !== CreateListStep.entry) {
            return;
        }

        return (
            <CreateEntryFormFormContainer onComplete={(v, item) => this.onCreateEntryFormComplete(v, item)}>
                {this.renderNav()}
            </CreateEntryFormFormContainer>
        );
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { entriesItems } = this.state;

        return (
            <tr key={index}>
                <td>
                    <ItemPopoverContainer item={entriesItems[entry.item_id]} />
                </td>
                <td>x{entry.quantity_modifier}</td>
            </tr>
        );
    }

    private onFinishClick() {
        const { listName, entries } = this.state;
        const { createPricelist, currentRegion, currentRealm, profile } = this.props;

        createPricelist(profile!.token, {
            entries,
            pricelist: { name: listName, region: currentRegion!.name, realm: currentRealm!.slug },
        });
    }

    private renderFinish() {
        const { createListStep, listName, entries } = this.state;
        const { createPricelistLevel, createPricelistErrors } = this.props;

        if (createListStep !== CreateListStep.finish) {
            return;
        }

        return (
            <>
                <DialogBody>
                    {this.renderNav()}
                    <HTMLTable
                        className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${
                            Classes.SMALL
                        } create-list-dialog-table`}
                    >
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>{entries.map((v, i) => this.renderEntry(i, v))}</tbody>
                    </HTMLTable>
                    <ErrorList errors={createPricelistErrors} />
                </DialogBody>
                <DialogActions>
                    <Button
                        text="Add More Entries"
                        intent={Intent.NONE}
                        onClick={() => this.setState({ createListStep: CreateListStep.entry })}
                        icon="caret-left"
                    />
                    <Button
                        text={`Finish "${listName}"`}
                        intent={Intent.PRIMARY}
                        disabled={createPricelistLevel === MutatePricelistLevel.fetching}
                        onClick={() => this.onFinishClick()}
                        icon="edit"
                    />
                </DialogActions>
            </>
        );
    }
}
