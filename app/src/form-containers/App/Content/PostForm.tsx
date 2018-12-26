import { withFormik, WithFormikConfig } from "formik";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { IFormValues, PostForm } from "@app/components/App/Content/PostForm";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { PostRules } from "@app/validator-rules";

interface IFormProps extends RouteComponentProps<{}> {
    onComplete: (v: IPostJson) => void;
    createPost: (token: string, v: ICreatePostRequest) => void;

    createPostErrors: {
        [key: string]: string;
    };
    createPostLevel: FetchLevel;
    currentPost: IPostJson | null;
    profile: IProfile | null;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { props }) => {
        const { createPost, profile } = props;

        if (profile === null) {
            return;
        }

        createPost(profile.token, values);
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
