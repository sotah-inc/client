import * as React from "react";

import { Button, Classes, Dialog, HTMLTable, Intent } from "@blueprintjs/core";

import { DialogActions, DialogBody, ErrorList, PanelHeader } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { ListFormFormContainer } from "@app/form-containers/App/PriceLists/util/ListForm";
import { IErrors, Item, ItemsMap } from "@app/types/global";
import { IPricelistEntry, ListDialogCompletion, ListDialogStep, MutatePricelistLevel } from "@app/types/price-lists";

interface IOnCompleteOptions {
    name: string;
    entries: Array<{
        id?: number;
        item_id: number;
        quantity_modifier: number;
    }>;
}

export interface IOwnProps {
    isOpen: boolean;
    title: string;
    mutationErrors: IErrors;
    mutatePricelistLevel: MutatePricelistLevel;

    onClose: () => void;
    onComplete: (opts: IOnCompleteOptions) => void;
}

export type Props = Readonly<IOwnProps>;

type State = Readonly<{
    listDialogStep: ListDialogStep;
    listName: string;
    listDialogCompletion: ListDialogCompletion;
    entries: IPricelistEntry[];
    entriesItems: ItemsMap;
}>;

export class CreateListDialog extends React.Component<Props, State> {
    public state = {
        entries: [],
        entriesItems: {},
        listDialogCompletion: ListDialogCompletion.initial,
        listDialogStep: ListDialogStep.list,
        listName: "",
    };

    public render() {
        const { isOpen, onClose, title } = this.props;

        return (
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                icon="manually-entered-data"
                canOutsideClickClose={false}
            >
                {this.renderCreateListForm()}
                {this.renderCreateEntriesForm()}
                {this.renderFinish()}
            </Dialog>
        );
    }

    private onNavClick(listDialogStep: ListDialogStep) {
        this.setState({ listDialogStep });
    }

    private renderNavHeader() {
        const { listDialogStep } = this.state;

        switch (listDialogStep) {
            case ListDialogStep.list:
                return <PanelHeader title="List" />;
            case ListDialogStep.entry:
                return (
                    <PanelHeader
                        title="Entry"
                        prev={{ onClick: () => this.onNavClick(ListDialogStep.list), title: "List" }}
                    />
                );
            case ListDialogStep.finish:
                return (
                    <PanelHeader
                        title="Finish"
                        prev={{ onClick: () => this.onNavClick(ListDialogStep.entry), title: "Entry" }}
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
        let listDialogCompletion = ListDialogCompletion.list;
        if (this.state.listDialogCompletion > listDialogCompletion) {
            listDialogCompletion = this.state.listDialogCompletion;
        }

        this.setState({
            listDialogCompletion,
            listDialogStep: ListDialogStep.entry,
            listName: name,
        });
    }

    private renderCreateListForm() {
        const { listDialogStep } = this.state;

        if (listDialogStep !== ListDialogStep.list) {
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
            entries: [...this.state.entries, v],
            listDialogCompletion: ListDialogCompletion.entry,
            listDialogStep: ListDialogStep.finish,
        });
    }

    private renderCreateEntriesForm() {
        const { listDialogStep } = this.state;

        if (listDialogStep !== ListDialogStep.entry) {
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
        const { onComplete } = this.props;

        onComplete({ entries, name: listName });
    }

    private renderFinish() {
        const { listDialogStep, listName, entries } = this.state;
        const { mutatePricelistLevel, mutationErrors } = this.props;

        if (listDialogStep !== ListDialogStep.finish) {
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
                    <ErrorList errors={mutationErrors} />
                </DialogBody>
                <DialogActions>
                    <Button
                        text="Add More Entries"
                        intent={Intent.NONE}
                        onClick={() => this.setState({ listDialogStep: ListDialogStep.entry })}
                        icon="caret-left"
                    />
                    <Button
                        text={`Finish "${listName}"`}
                        intent={Intent.PRIMARY}
                        disabled={mutatePricelistLevel === MutatePricelistLevel.fetching}
                        onClick={() => this.onFinishClick()}
                        icon="edit"
                    />
                </DialogActions>
            </>
        );
    }
}
