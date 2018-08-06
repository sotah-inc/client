import * as React from "react";

import { Button, FormGroup, H5, Intent } from "@blueprintjs/core";
import { FormikProps } from "formik";

import { DialogActions, DialogBody, ItemInput } from "@app/components/util";
import { Generator as FormFieldGenerator } from "@app/components/util/FormField";
import { Item } from "@app/types/global";
import { IPricelistEntry } from "@app/types/price-lists";
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from "@app/util";

import "./CreateEntryForm.scss";

export interface IOwnProps {
    onComplete: (entry: IPricelistEntry, item: Item) => void;
    isSubmitDisabled?: boolean;
}

export interface IFormValues {
    quantity: number;
    item: Item | null;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export class CreateEntryForm extends React.Component<Props> {
    public renderSelectedItem(item: Item | null) {
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
        } = this.props;
        const createFormField = FormFieldGenerator({ setFieldValue });

        const itemIntent = errors.item && touched.item ? Intent.DANGER : Intent.NONE;
        const isSubmitDisabled = isSubmitting || this.props.isSubmitDisabled;

        return (
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    {children}
                    <div className="pure-g">
                        <div className="pure-u-1-2">
                            <div style={{ paddingRight: "5px" }}>
                                <FormGroup helperText={errors.item} label="Item" labelInfo={true} intent={itemIntent}>
                                    <ItemInput onSelect={v => setFieldValue("item", v)} autoFocus={true} />
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
                        placeholder: "-1",
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
}
