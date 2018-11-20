import * as React from "react";

import { Button, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { FormikProps } from "formik";

import { DialogActions, DialogBody } from "@app/components/util";
import { Generator as FormFieldGenerator } from "@app/components/util/FormField";

export interface IOwnProps {
    onComplete: (name: string) => void;
    defaultName?: string;
    submitIcon: IconName;
    submitText: string;
}

export interface IFormValues {
    name: string;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export class ListForm extends React.Component<Props> {
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
            submitIcon,
            submitText,
        } = this.props;
        const createFormField = FormFieldGenerator({ setFieldValue });

        return (
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    {children}
                    {createFormField({
                        autofocus: true,
                        fieldName: "name",
                        getError: () => errors.name,
                        getTouched: () => !!touched.name,
                        getValue: () => values.name,
                        placeholder: "",
                        type: "string",
                    })}
                </DialogBody>
                <DialogActions>
                    <Button text="Reset" intent={Intent.NONE} onClick={handleReset} disabled={!dirty || isSubmitting} />
                    <Button
                        type="submit"
                        text={submitText}
                        intent={Intent.PRIMARY}
                        icon={submitIcon}
                        disabled={isSubmitting}
                    />
                </DialogActions>
            </form>
        );
    }
}
