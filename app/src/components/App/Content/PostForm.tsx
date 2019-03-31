import React, { useEffect, useState } from "react";

import {
    Alignment,
    Button,
    Callout,
    Card,
    ControlGroup,
    FormGroup,
    H4,
    H5,
    InputGroup,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    TextArea,
} from "@blueprintjs/core";
import { FormikProps } from "formik";
import ReactMarkdown from "react-markdown";
import speakingurl from "speakingurl";

import { FetchLevel } from "@app/types/main";

export interface IOwnProps {
    onSubmit: (v: IFormValues) => void;
    onComplete: () => void;
    onFatalError: (err: string) => void;

    mutatePostLevel: FetchLevel;
    mutatePostErrors: {
        [key: string]: string;
    };
    defaultFormValues?: IFormValues;
}

export interface IFormValues {
    title: string;
    body: string;
    slug: string;
    summary: string;
}

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

const renderPreviewContent = (values: IFormValues) => {
    const { title, slug, body, summary } = values;

    if (typeof title === "undefined" || title.length === 0) {
        return (
            <>
                <Callout
                    title="Preview"
                    icon="manually-entered-data"
                    intent={Intent.PRIMARY}
                    style={{ marginBottom: "10px" }}
                >
                    This is a preview of the news posting.
                </Callout>
                <p>
                    <em>Silence is golden.</em>
                </p>
            </>
        );
    }

    return (
        <>
            <Callout
                title="Preview"
                icon="manually-entered-data"
                intent={Intent.PRIMARY}
                style={{ marginBottom: "10px" }}
            >
                This is a preview of the news posting.
            </Callout>
            <H4>{title}</H4>
            <p>
                Slug: <span style={{ textDecoration: "underline" }}>{`/content/news/${slug}`}</span>
            </p>
            <hr />
            <H5>Summary</H5>
            <Card elevation={2}>
                <ReactMarkdown source={summary} />
            </Card>
            <hr />
            <H5>Body</H5>
            <ReactMarkdown source={body} />
        </>
    );
};

const renderPreview = (values: IFormValues) => <div style={{ marginLeft: "10px" }}>{renderPreviewContent(values)}</div>;

const renderForm = (props: Props, manualSlug: boolean, setManualSlug: (v: boolean) => void) => {
    const { values, setFieldValue, errors, touched, mutatePostErrors } = props;

    const coalescedErrors = {
        ...errors,
        ...mutatePostErrors,
    };

    return (
        <>
            <Callout title="Input" icon="edit" style={{ marginBottom: "10px" }}>
                Please enter your news post here.
            </Callout>
            <FormGroup
                helperText={coalescedErrors.title}
                label="Title"
                labelFor="title"
                labelInfo={true}
                intent={coalescedErrors.title && !!touched.title ? Intent.DANGER : Intent.NONE}
            >
                <InputGroup
                    intent={coalescedErrors.title && !!touched.title ? Intent.DANGER : Intent.NONE}
                    type="text"
                    value={values.title}
                    autoFocus={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("title", e.target.value);

                        if (manualSlug) {
                            return;
                        }

                        setFieldValue("slug", speakingurl(e.target.value));
                    }}
                />
            </FormGroup>
            <FormGroup
                helperText={coalescedErrors.slug ? coalescedErrors.slug : "For URLs"}
                label="Slug"
                labelFor="slug"
                labelInfo={true}
                intent={coalescedErrors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
            >
                <ControlGroup fill={true}>
                    <InputGroup
                        intent={coalescedErrors.slug && !!touched.slug ? Intent.DANGER : Intent.NONE}
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
            <FormGroup
                helperText={coalescedErrors.summary}
                label="Summary"
                labelFor="summary"
                labelInfo={true}
                intent={coalescedErrors.summary && !!touched.summary ? Intent.DANGER : Intent.NONE}
            >
                <ControlGroup fill={true}>
                    <TextArea
                        value={values.summary}
                        onChange={e => setFieldValue("summary", e.target.value)}
                        style={{ minHeight: "200px" }}
                    />
                </ControlGroup>
            </FormGroup>
            <FormGroup
                helperText={coalescedErrors.body}
                label="Body"
                labelFor="body"
                labelInfo={true}
                intent={coalescedErrors.body && !!touched.body ? Intent.DANGER : Intent.NONE}
            >
                <ControlGroup fill={true}>
                    <TextArea
                        value={values.body}
                        onChange={e => setFieldValue("body", e.target.value)}
                        style={{ minHeight: "200px" }}
                    />
                </ControlGroup>
            </FormGroup>
        </>
    );
};

// Gnoll Report 1: WoW Recession Edition
export function PostForm(props: Props) {
    const {
        handleSubmit,
        handleReset,
        dirty,
        isSubmitting,
        mutatePostLevel,
        values,
        setSubmitting,
        mutatePostErrors,
        onFatalError,
        onComplete,
    } = props;

    const [manualSlug, setManualSlug] = useState(false);

    useEffect(() => {
        switch (mutatePostLevel) {
            case FetchLevel.success:
                setSubmitting(false);
                handleReset();
                onComplete();

                return;
            case FetchLevel.failure:
                setSubmitting(false);
                if ("error" in mutatePostErrors) {
                    onFatalError(mutatePostErrors.error);
                }

                return;
            default:
                return;
        }
    }, [mutatePostLevel]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <Button
                            type="submit"
                            icon="edit"
                            text="Publish"
                            intent={Intent.PRIMARY}
                            disabled={isSubmitting}
                        />
                        <NavbarDivider />
                        <Button
                            text="Reset"
                            intent={Intent.NONE}
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting || mutatePostLevel === FetchLevel.fetching}
                        />
                    </NavbarGroup>
                </Navbar>
                <div className="pure-g" style={{ marginTop: "10px" }}>
                    <div className="pure-u-2-5">{renderForm(props, manualSlug, setManualSlug)}</div>
                    <div className="pure-u-3-5">{renderPreview(values)}</div>
                </div>
                <Callout intent={Intent.WARNING} icon="dollar">
                    <em>Make gold!</em>
                </Callout>
            </form>
        </>
    );
}
