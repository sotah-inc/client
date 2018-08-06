import * as React from "react";

import { Button, Dialog, Intent } from "@blueprintjs/core";
import { FormikProps } from "formik";

import { IProfile } from "@app/types/global";
import { DialogActions, DialogBody } from "../util";
import { Generator as FormFieldGenerator } from "../util/FormField";

export interface IStateProps {
    isRegistered: boolean;
}

export interface IDispatchProps {
    onUserRegister: (payload: IProfile) => void;
}

export interface IFormValues {
    email: string;
    password: string;
}

export type Props = Readonly<IStateProps & IDispatchProps & FormikProps<IFormValues>>;

type State = Readonly<{
    isDialogOpen: boolean;
}>;

export class Register extends React.Component<Props, State> {
    public state: State = {
        isDialogOpen: false,
    };

    public componentDidUpdate() {
        const { isRegistered } = this.props;

        if (isRegistered) {
            this.setState({ isDialogOpen: false });
        }
    }

    public renderForm() {
        const { values, setFieldValue, isSubmitting, handleReset, handleSubmit, dirty, errors, touched } = this.props;
        const createFormField = FormFieldGenerator({ setFieldValue });

        return (
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    {createFormField({
                        fieldName: "email",
                        getError: () => errors.email,
                        getTouched: () => !!touched.email,
                        getValue: () => values.email,
                        helperText: "For communication",
                        placeholder: "test@example.com",
                        type: "email",
                    })}
                    {createFormField({
                        fieldName: "password",
                        getError: () => errors.password,
                        getTouched: () => !!touched.password,
                        getValue: () => values.password,
                        helperText: "For login",
                        type: "password",
                    })}
                </DialogBody>
                <DialogActions>
                    <Button text="Reset" intent={Intent.NONE} onClick={handleReset} disabled={!dirty || isSubmitting} />
                    <Button type="submit" text="Register" intent={Intent.PRIMARY} icon="edit" disabled={isSubmitting} />
                </DialogActions>
            </form>
        );
    }

    public toggleDialog() {
        this.setState({ isDialogOpen: !this.state.isDialogOpen });
    }

    public render() {
        return (
            <>
                <Button onClick={this.toggleDialog} text="Register" icon="user" />
                <Dialog
                    isOpen={this.state.isDialogOpen}
                    onClose={this.toggleDialog}
                    title="Register"
                    icon="manually-entered-data"
                >
                    {this.renderForm()}
                </Dialog>
            </>
        );
    }
}
