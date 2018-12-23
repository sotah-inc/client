import * as React from "react";

import { FormikProps } from "formik";

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

    public render() {
        return <p>Hello, world!</p>;
    }
}
