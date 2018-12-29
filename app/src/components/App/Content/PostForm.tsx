import * as React from "react";

import {
    Alignment,
    Button,
    Callout,
    Card,
    ControlGroup,
    FormGroup,
    H2,
    H4,
    InputGroup,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    TextArea,
} from "@blueprintjs/core";
import { FormikProps } from "formik";
import * as ReactMarkdown from "react-markdown";
import * as getSlug from "speakingurl";

import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IOwnProps {
    onSubmit: (v: IFormValues) => void;
    onComplete: () => void;

    mutatePostLevel: FetchLevel;
    mutatePostErrors: {
        [key: string]: string;
    };
}

export interface IFormValues {
    title: string;
    body: string;
    slug: string;
    summary: string;
}

type State = Readonly<{
    manualSlug: boolean;
}>;

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export class PostForm extends React.Component<Props, State> {
    public state: State = {
        manualSlug: false,
    };

    public componentDidUpdate(prevProps: Props) {
        const { mutatePostLevel, setSubmitting, handleReset, mutatePostErrors, onComplete } = this.props;

        switch (mutatePostLevel) {
            case FetchLevel.success:
                break;
            case FetchLevel.failure:
                if (prevProps.mutatePostLevel !== mutatePostLevel) {
                    setSubmitting(false);
                    if ("error" in mutatePostErrors) {
                        AppToaster.show({
                            icon: "warning-sign",
                            intent: "danger",
                            message: `Could not create post: ${mutatePostErrors.error}`,
                        });
                    }

                    return;
                }

                return;
            default:
                return;
        }

        if (prevProps.mutatePostLevel !== mutatePostLevel) {
            setSubmitting(false);
            handleReset();
            onComplete();
            // AppToaster.show({
            //     icon: "info-sign",
            //     intent: "success",
            //     message: "Your post has successfully been created!",
            // });

            // if (currentPost === null) {
            //     return;
            // }

            // history.push(`/content/news/${currentPost.slug}`);

            return;
        }
    }

    public render() {
        const { handleSubmit, handleReset, dirty, isSubmitting, mutatePostLevel } = this.props;

        return (
            <>
                <H2>News Creator</H2>
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
                        <div className="pure-u-2-5">{this.renderForm()}</div>
                        <div className="pure-u-3-5">{this.renderPreview()}</div>
                    </div>
                    <Callout intent={Intent.WARNING} icon="dollar">
                        <em>Make gold!</em>
                    </Callout>
                </form>
            </>
        );
    }

    // Gnoll Report 1: WoW Recession Edition

    private renderPreview() {
        return <div style={{ marginLeft: "10px" }}>{this.renderPreviewContent()}</div>;
    }

    private renderPreviewContent() {
        const {
            values: { title, slug, body, summary },
        } = this.props;

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
                <Card elevation={2}>
                    <ReactMarkdown source={summary} />
                </Card>
                <ReactMarkdown source={body} />
            </>
        );
    }

    private renderForm() {
        const { values, setFieldValue, errors, touched, mutatePostErrors } = this.props;
        const { manualSlug } = this.state;

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
                        onChange={e => {
                            setFieldValue("title", e.target.value);

                            if (manualSlug) {
                                return;
                            }

                            setFieldValue("slug", getSlug(e.target.value));
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
                            onChange={e => setFieldValue("slug", e.target.value)}
                            disabled={!manualSlug}
                        />
                        <Button
                            active={manualSlug}
                            icon="edit"
                            onClick={() => this.setState({ manualSlug: !manualSlug })}
                        >
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
    }
}
