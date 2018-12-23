import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IFormValues, PostForm } from "@app/components/App/Content/PostForm";
import { PostRules } from "@app/validator-rules";

interface IFormProps {
    onComplete: (values: IFormValues) => void;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, props }) => {
        setSubmitting(false);
        props.onComplete(values);
    },
    mapPropsToValues: (_: IFormProps) => {
        return {
            body: "",
            slug: "",
            title: "",
        };
    },
    validationSchema: Yup.object().shape({
        body: PostRules.body,
        slug: PostRules.slug,
        title: PostRules.title,
    }),
};

export const PostFormFormContainer = withFormik(config)(PostForm);
