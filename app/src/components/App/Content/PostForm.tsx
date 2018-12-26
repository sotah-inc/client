import * as React from "react";

import {
    Alignment,
    Button,
    Callout,
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
import { RouteComponentProps } from "react-router-dom";
import * as getSlug from "speakingurl";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    createPostErrors: {
        [key: string]: string;
    };
    createPostLevel: FetchLevel;
    profile: IProfile | null;
    currentPost: IPostJson | null;
}

export interface IDispatchProps {
    createPost: (token: string, v: ICreatePostRequest) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {
    onComplete: (v: IPostJson) => void;
}

export interface IFormValues {
    title: string;
    body: string;
    slug: string;
}

type State = Readonly<{
    manualSlug: boolean;
}>;

export type Props = Readonly<IDispatchProps & IStateProps & IOwnProps & FormikProps<IFormValues>>;

export class PostForm extends React.Component<Props, State> {
    public state: State = {
        manualSlug: false,
    };

    public componentDidMount() {
        setTitle("News Creator");
    }

    public componentDidUpdate(prevProps: Props) {
        const { createPostLevel, setSubmitting, handleReset, createPostErrors, history, currentPost } = this.props;

        switch (createPostLevel) {
            case FetchLevel.success:
                break;
            case FetchLevel.failure:
                if (prevProps.createPostLevel !== createPostLevel) {
                    setSubmitting(false);
                    if ("error" in createPostErrors) {
                        AppToaster.show({
                            icon: "warning-sign",
                            intent: "danger",
                            message: `Could not create post: ${createPostErrors.error}`,
                        });
                    }

                    return;
                }

                return;
            default:
                return;
        }

        if (prevProps.createPostLevel !== createPostLevel) {
            setSubmitting(false);
            handleReset();
            AppToaster.show({
                icon: "info-sign",
                intent: "success",
                message: "Your post has successfully been created!",
            });

            if (currentPost === null) {
                return;
            }

            history.push(`/content/news/${currentPost.slug}`);

            return;
        }
    }

    public render() {
        const { handleSubmit, handleReset, dirty, isSubmitting, createPostLevel } = this.props;

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
                                disabled={!dirty || isSubmitting || createPostLevel === FetchLevel.fetching}
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
        return <div style={{ marginLeft: "5px" }}>{this.renderPreviewContent()}</div>;
    }

    private renderPreviewContent() {
        const {
            values: { title, slug, body },
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
                <ReactMarkdown source={body} />
            </>
        );
    }

    private renderForm() {
        const { values, setFieldValue, errors, touched, createPostErrors } = this.props;
        const { manualSlug } = this.state;

        const coalescedErrors = {
            ...errors,
            ...createPostErrors,
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
