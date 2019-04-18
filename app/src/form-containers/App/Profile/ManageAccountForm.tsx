import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IFormValues, ManageAccountForm } from "@app/components/App/Profile/ManageAccountForm";
import { FetchLevel } from "@app/types/main";
import { ManageAccountRules } from "@app/validator-rules";

interface IFormProps {
    onSubmit: (v: IFormValues) => void;
    onComplete: () => void;
    onFatalError: (err: string) => void;

    updateProfileLevel: FetchLevel;
    updateProfileErrors: {
        [key: string]: string;
    };
    defaultFormValues?: IFormValues;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { props }) => {
        const { onSubmit } = props;

        onSubmit(values);
    },
    mapPropsToValues: ({ defaultFormValues }: IFormProps) => {
        if (typeof defaultFormValues !== "undefined") {
            return defaultFormValues;
        }

        return {
            email: "",
        };
    },
    validationSchema: Yup.object().shape({
        email: ManageAccountRules.email,
    }),
};

export const ManageAccountFormFormContainer = withFormik(config)(ManageAccountForm);
