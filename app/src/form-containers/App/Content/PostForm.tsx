import { withFormik, WithFormikConfig } from "formik";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import { IPostJson } from "@app/api-types/entities";
import { IFormValues, PostForm } from "@app/components/App/Content/PostForm";
import { FetchLevel } from "@app/types/main";
import { PostRules } from "@app/validator-rules";

interface IFormProps extends RouteComponentProps<{}> {
    onSubmit: (v: IFormValues) => void;

    mutatePostErrors: {
        [key: string]: string;
    };
    mutatePostLevel: FetchLevel;
    currentPost: IPostJson | null;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { props }) => {
        const { onSubmit } = props;

        onSubmit(values);
    },
    mapPropsToValues: (_: IFormProps) => {
        return {
            body: "",
            slug: "",
            summary: "",
            title: "",
        };
    },
    validationSchema: Yup.object().shape({
        body: PostRules.body,
        slug: PostRules.slug,
        summary: PostRules.summary,
        title: PostRules.title,
    }),
};

export const PostFormFormContainer = withFormik(config)(PostForm);
