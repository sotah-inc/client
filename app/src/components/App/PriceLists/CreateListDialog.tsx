import * as React from "react";

import { Breadcrumb, Button, Classes, Dialog, HTMLTable, Intent } from "@blueprintjs/core";

import { ICreatePricelistRequest } from "@app/api/price-lists";
import { DialogActions, DialogBody, ErrorList } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { ListFormFormContainer } from "@app/form-containers/App/PriceLists/util/ListForm";
import { IErrors, IProfile, IRealm, IRegion, Item, ItemClasses, ItemsMap } from "@app/types/global";
import { CreateListCompletion, CreateListStep, CreatePricelistLevel, IPricelistEntry } from "@app/types/price-lists";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isAddListDialogOpen: boolean;
    itemClasses: ItemClasses;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    createPricelistLevel: CreatePricelistLevel;
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
    public state: State = {
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
                case CreatePricelistLevel.success:
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

    public onNavClick(createListStep: CreateListStep) {
        this.setState({ createListStep });
    }

    public renderNav() {
        const { createListCompletion } = this.state;

        return (
            <ul className={Classes.BREADCRUMBS}>
                <li>
                    <Breadcrumb
                        text="List"
                        onClick={() => this.onNavClick(CreateListStep.list)}
                        className={
                            createListCompletion === CreateListCompletion.initial ? Classes.BREADCRUMB_CURRENT : ""
                        }
                    />
                </li>
                <li>
                    <Breadcrumb
                        text="Entry"
                        disabled={createListCompletion < CreateListCompletion.list}
                        onClick={() => this.onNavClick(CreateListStep.entry)}
                        className={createListCompletion === CreateListCompletion.list ? Classes.BREADCRUMB_CURRENT : ""}
                    />
                </li>
                <li>
                    <Breadcrumb
                        text="Finish"
                        disabled={createListCompletion < CreateListCompletion.entry}
                        onClick={() => this.onNavClick(CreateListStep.finish)}
                        className={
                            createListCompletion === CreateListCompletion.entry ? Classes.BREADCRUMB_CURRENT : ""
                        }
                    />
                </li>
            </ul>
        );
    }

    public onCreateListFormComplete(name: string) {
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

    public renderCreateListForm() {
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

    public onCreateEntryFormComplete(v: IPricelistEntry, item: Item) {
        const entriesItems = this.state.entriesItems;
        entriesItems[item.id] = item;
        this.setState({ entriesItems: { ...entriesItems } });

        this.setState({
            createListCompletion: CreateListCompletion.entry,
            createListStep: CreateListStep.finish,
            entries: [...this.state.entries, v],
        });
    }

    public renderCreateEntriesForm() {
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

    public renderEntry(index: number, entry: IPricelistEntry) {
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

    public onFinishClick() {
        const { listName, entries } = this.state;
        const { createPricelist, currentRegion, currentRealm, profile } = this.props;

        createPricelist(profile!.token, {
            entries,
            pricelist: { name: listName, region: currentRegion!.name, realm: currentRealm!.slug },
        });
    }

    public renderFinish() {
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
                        disabled={createPricelistLevel === CreatePricelistLevel.fetching}
                        onClick={() => this.onFinishClick()}
                        icon="edit"
                    />
                </DialogActions>
            </>
        );
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
}
