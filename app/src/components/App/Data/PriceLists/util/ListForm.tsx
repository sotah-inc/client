import React, { useState } from "react";

import { Button, ControlGroup, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { FormikProps } from "formik";
import speakingurl from "speakingurl";

import { DialogActions, DialogBody } from "@app/components/util";

export interface IOwnProps {
    onComplete: (name: string, slug: string) => void;
    defaultName?: string;
    submitIcon: IconName;
    submitText: string;
    children: React.ReactChildren;
}

export interface IFormValues {
    name: string;
    slug: string;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export const ListForm: React.FunctionComponent = (props: Props) => {
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
    } = props;

    const [manualSlug, setManualSlug] = useState(false);

    return (
        <form onSubmit={handleSubmit}>
            <DialogBody>
                {children}
                <FormGroup
                    helperText={errors.name}
                    label="Name"
                    labelFor="name"
                    labelInfo={true}
                    intent={errors.name && !!touched.name ? Intent.DANGER : Intent.NONE}
                >
                    <InputGroup
                        intent={errors.name && !!touched.name ? Intent.DANGER : Intent.NONE}
                        type="text"
                        value={values.name}
                        autoFocus={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue("name", e.target.value);

                            if (manualSlug) {
                                return;
                            }

                            setFieldValue("slug", speakingurl(e.target.value));
                        }}
                    />
                </FormGroup>
                <FormGroup
                    helperText={errors.slug ? errors.slug : "For URLs"}
                    label="Slug"
                    labelFor="slug"
                    labelInfo={true}
                    intent={errors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
                >
                    <ControlGroup fill={true}>
                        <InputGroup
                            intent={errors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
                            type="text"
                            value={values.slug}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("slug", e.target.value)}
                            disabled={!manualSlug}
                        />
                        <Button active={manualSlug} icon="edit" onClick={() => setManualSlug(!manualSlug)}>
                            Edit
                        </Button>
                    </ControlGroup>
                </FormGroup>
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
};
