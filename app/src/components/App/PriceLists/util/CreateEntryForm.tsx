import * as React from "react";

import { Button, FormGroup, H5, Intent } from "@blueprintjs/core";
import { FormikProps } from "formik";

import { IPricelistEntryJson } from "@app/api-types/entities";
import { IItem } from "@app/api-types/item";
import { DialogActions, DialogBody, ItemInput } from "@app/components/util";
import { Generator as FormFieldGenerator } from "@app/components/util/FormField";
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from "@app/util";

import "./CreateEntryForm.scss";

export interface IOwnProps {
    onComplete: (entry: IPricelistEntryJson, item: IItem) => void;
    onItemSelect?: (item: IItem) => void;

    isSubmitDisabled?: boolean;
    externalItemError?: string;
}

export interface IFormValues {
    quantity: number;
    item: IItem | null;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export class CreateEntryForm extends React.Component<Props> {
    public render() {
        const {
            values,
            setFieldValue,
            isSubmitting,
            handleReset,
            handleSubmit,
            dirty,
            errors,
            touched,
            children,
            externalItemError,
        } = this.props;
        const createFormField = FormFieldGenerator({ setFieldValue });

        const itemIntent = this.getItemError() && touched.item ? Intent.DANGER : Intent.NONE;
        const isSubmitDisabled = isSubmitting || this.props.isSubmitDisabled || !!externalItemError;

        return (
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    {children}
                    <div className="pure-g">
                        <div className="pure-u-1-2">
                            <div style={{ paddingRight: "5px" }}>
                                <FormGroup
                                    helperText={this.getItemError()}
                                    label="Item"
                                    labelInfo={true}
                                    intent={itemIntent}
                                >
                                    <ItemInput onSelect={v => this.onItemSelect(v)} autoFocus={true} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="pure-u-1-2">
                            <div style={{ paddingLeft: "5px" }}>
                                <FormGroup label="Selected item" intent={itemIntent}>
                                    {this.renderSelectedItem(values.item)}
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    {createFormField({
                        fieldName: "quantity",
                        getError: () => errors.quantity,
                        getTouched: () => !!touched.quantity,
                        getValue: () => values.quantity.toString(),
                        placeholder: "1",
                        type: "number",
                    })}
                </DialogBody>
                <DialogActions>
                    <Button text="Reset" intent={Intent.NONE} onClick={handleReset} disabled={!dirty || isSubmitting} />
                    <Button
                        type="submit"
                        text="Add Entry"
                        intent={Intent.PRIMARY}
                        icon="edit"
                        disabled={isSubmitDisabled}
                    />
                </DialogActions>
            </form>
        );
    }

    private getItemError() {
        const { errors, externalItemError } = this.props;

        if (errors.item) {
            return errors.item;
        }

        if (externalItemError) {
            return externalItemError;
        }

        return null;
    }

    private onItemSelect(item: IItem) {
        const { setFieldValue, onItemSelect, setFieldTouched } = this.props;

        setFieldValue("item", item);
        setFieldTouched("item");
        if (onItemSelect) {
            onItemSelect(item);
        }
    }

    private renderSelectedItem(item: IItem | null) {
        if (item === null) {
            return (
                <p>
                    <em>No item selected.</em>
                </p>
            );
        }

        const className = qualityToColorClass(item.quality);
        const textValue = getItemTextValue(item);
        const itemIcon = getItemIconUrl(item);
        if (itemIcon === null) {
            return <p className={className}>{textValue}</p>;
        }

        return (
            <H5 className={`${className} new-entry-item`}>
                <img src={itemIcon} /> {textValue}
            </H5>
        );
    }
}
