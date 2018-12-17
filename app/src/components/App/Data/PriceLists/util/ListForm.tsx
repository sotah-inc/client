import * as React from "react";

import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { FormikProps } from "formik";
import * as getSlug from "speakingurl";

import { DialogActions, DialogBody } from "@app/components/util";

export interface IOwnProps {
    onComplete: (name: string, slug: string) => void;
    defaultName?: string;
    submitIcon: IconName;
    submitText: string;
}

export interface IFormValues {
    name: string;
    slug: string;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

type State = Readonly<{
    manualSlug: boolean;
}>;

export class ListForm extends React.Component<Props, State> {
    public state: State = {
        manualSlug: false,
    };

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
        const { manualSlug } = this.state;

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
                            onChange={e => {
                                setFieldValue("name", e.target.value);

                                if (manualSlug) {
                                    return;
                                }

                                setFieldValue("slug", getSlug(e.target.value));
                            }}
                        />
                    </FormGroup>
                    <FormGroup
                        helperText={errors.slug}
                        label="Slug"
                        labelFor="slug"
                        labelInfo={true}
                        intent={errors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
                    >
                        <InputGroup
                            intent={errors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
                            type="text"
                            value={values.slug}
                            onChange={e => setFieldValue("slug", e.target.value)}
                        />
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
    }
}
