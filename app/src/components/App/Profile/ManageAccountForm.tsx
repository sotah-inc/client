import React, { useEffect } from "react";

import {
    Alignment,
    Button,
    Callout,
    FormGroup,
    InputGroup,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
} from "@blueprintjs/core";
import { FormikProps } from "formik";

import { FetchLevel } from "@app/types/main";

export interface IOwnProps {
    onSubmit: (v: IFormValues) => void;
    onComplete: () => void;
    onFatalError: (err: string) => void;

    updateProfileLevel: FetchLevel;
    updateProfileErrors: {
        [key: string]: string;
    };
    defaultFormValues?: IFormValues;
}

export interface IFormValues {
    email: string;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

const renderForm = (props: Props) => {
    const { values, setFieldValue, errors, touched, updateProfileErrors } = props;

    const coalescedErrors = {
        ...errors,
        ...updateProfileErrors,
    };

    return (
        <>
            <Callout title="Input" icon="edit" style={{ marginBottom: "10px" }}>
                Please enter your profile information here.
            </Callout>
            <FormGroup
                helperText={coalescedErrors.email}
                label="Email"
                labelFor="email"
                labelInfo={true}
                intent={coalescedErrors.email && !!touched.email ? Intent.DANGER : Intent.NONE}
            >
                <InputGroup
                    intent={coalescedErrors.email && !!touched.email ? Intent.DANGER : Intent.NONE}
                    type="text"
                    value={values.email}
                    autoFocus={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value)}
                />
            </FormGroup>
        </>
    );
};

export function ManageAccountForm(props: Props) {
    const {
        handleSubmit,
        handleReset,
        dirty,
        isSubmitting,
        updateProfileLevel,
        setSubmitting,
        updateProfileErrors,
        onFatalError,
        onComplete,
    } = props;

    useEffect(() => {
        switch (updateProfileLevel) {
            case FetchLevel.success:
                setSubmitting(false);
                handleReset();
                onComplete();

                return;
            case FetchLevel.failure:
                setSubmitting(false);
                if ("error" in updateProfileErrors) {
                    onFatalError(updateProfileErrors.error);
                }

                return;
            default:
                return;
        }
    }, [updateProfileLevel]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <Button type="submit" icon="edit" text="Save" intent={Intent.PRIMARY} disabled={isSubmitting} />
                        <NavbarDivider />
                        <Button
                            text="Reset"
                            intent={Intent.NONE}
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting || updateProfileLevel === FetchLevel.fetching}
                        />
                    </NavbarGroup>
                </Navbar>
                <div className="pure-g" style={{ marginTop: "10px" }}>
                    <div className="pure-u-2-5">{renderForm(props)}</div>
                    <div className="pure-u-3-5">&nbsp;</div>
                </div>
                <Callout intent={Intent.WARNING} icon="dollar">
                    <em>Make gold!</em>
                </Callout>
            </form>
        </>
    );
}
