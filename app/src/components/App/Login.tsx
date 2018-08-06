import { Button, Dialog, Intent } from "@blueprintjs/core";
import { FormikProps } from "formik";
import * as React from "react";

import { IProfile } from "@app/types/global";
import { DialogActions, DialogBody } from "../util";
import { Generator as FormFieldGenerator } from "../util/FormField";

export interface IStateProps {
    isLoggedIn: boolean;
    isLoginDialogOpen: boolean;
}

export interface IDispatchProps {
    onUserLogin: (payload: IProfile) => void;
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
}

export interface IFormValues {
    email: string;
    password: string;
}

export type Props = Readonly<IStateProps & IDispatchProps & FormikProps<IFormValues>>;

export class Login extends React.Component<Props> {
    public componentDidUpdate() {
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            this.toggleDialog();
        }
    }

    public renderForm() {
        const { values, setFieldValue, isSubmitting, handleReset, handleSubmit, dirty, errors, touched } = this.props;
        const createFormField = FormFieldGenerator({ setFieldValue });

        return (
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    {createFormField({
                        autofocus: true,
                        fieldName: "email",
                        getError: () => errors.email,
                        getTouched: () => !!touched.email,
                        getValue: () => values.email,
                        placeholder: "test@example.com",
                        type: "email",
                    })}
                    {createFormField({
                        fieldName: "password",
                        getError: () => errors.password,
                        getTouched: () => !!touched.password,
                        getValue: () => values.password,
                        type: "password",
                    })}
                </DialogBody>
                <DialogActions>
                    <Button text="Reset" intent={Intent.NONE} onClick={handleReset} disabled={!dirty || isSubmitting} />
                    <Button type="submit" text="Login" intent={Intent.PRIMARY} icon="edit" disabled={isSubmitting} />
                </DialogActions>
            </form>
        );
    }

    public toggleDialog() {
        this.props.changeIsLoginDialogOpen(!this.props.isLoginDialogOpen);
    }

    public render() {
        const { isLoginDialogOpen } = this.props;

        return (
            <>
                <Button onClick={this.toggleDialog} type="button" icon="log-in" text="Login" />
                <Dialog
                    isOpen={isLoginDialogOpen}
                    onClose={this.toggleDialog}
                    title="Login"
                    icon="manually-entered-data"
                >
                    {this.renderForm()}
                </Dialog>
            </>
        );
    }
}
