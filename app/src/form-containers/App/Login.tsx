import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { loginUser } from "@app/api/user";
import { IFormValues, Login } from "@app/components/App/Login";
import { IProfile } from "@app/types/global";
import { UserRules } from "@app/validator-rules";

interface IFormProps {
    isLoggedIn: boolean;
    isLoginDialogOpen: boolean;
    onUserLogin: (payload: IProfile) => void;
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
        const { profile, errors } = await loginUser(values.email, values.password);
        if (errors !== null) {
            setErrors(errors);
            setSubmitting(false);

            return;
        }

        setSubmitting(false);
        props.onUserLogin(profile!);
    },
    mapPropsToValues: (_: IFormProps) => {
        return {
            email: "",
            password: "",
        };
    },
    validationSchema: Yup.object().shape({
        email: UserRules.email,
        password: UserRules.password,
    }),
};

export const LoginFormContainer = withFormik(config)(Login);
