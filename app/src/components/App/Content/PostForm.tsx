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
import * as getSlug from "speakingurl";

import { setTitle } from "@app/util";

export interface IOwnProps {
    onComplete: (values: IFormValues) => void;
}

export interface IFormValues {
    title: string;
    body: string;
    slug: string;
}

type State = Readonly<{
    manualSlug: boolean;
}>;

export type Props = Readonly<IOwnProps & FormikProps<IFormValues>>;

export class PostForm extends React.Component<Props, State> {
    public state: State = {
        manualSlug: false,
    };

    public componentDidMount() {
        setTitle("News Creator");
    }

    public render() {
        const { handleSubmit, handleReset, dirty, isSubmitting } = this.props;

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
                                disabled={!dirty || isSubmitting}
                            />
                        </NavbarGroup>
                    </Navbar>
                    <div className="pure-g" style={{ marginTop: "10px" }}>
                        <div className="pure-u-2-5">{this.renderForm()}</div>
                        <div className="pure-u-3-5">{this.renderPreview()}</div>
                    </div>
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
        const { values, setFieldValue, errors, touched } = this.props;
        const { manualSlug } = this.state;

        return (
            <>
                <Callout title="Input" icon="edit" style={{ marginBottom: "10px" }}>
                    Please enter your news post here.
                </Callout>
                <FormGroup
                    helperText={errors.title}
                    label="Title"
                    labelFor="title"
                    labelInfo={true}
                    intent={errors.title && !!touched.title ? Intent.DANGER : Intent.NONE}
                >
                    <InputGroup
                        intent={errors.title && !!touched.title ? Intent.DANGER : Intent.NONE}
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
                    helperText={errors.body}
                    label="Body"
                    labelFor="body"
                    labelInfo={true}
                    intent={errors.body && !!touched.body ? Intent.DANGER : Intent.NONE}
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
