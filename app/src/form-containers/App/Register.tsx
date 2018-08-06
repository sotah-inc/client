import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { registerUser } from "@app/api/user";
import { IFormValues, Register } from "@app/components/App/Register";
import { IProfile } from "@app/types/global";
import { UserRules } from "@app/validator-rules";

interface IFormProps {
    onUserRegister: (payload: IProfile) => void;
    isRegistered: boolean;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
        const { profile, errors } = await registerUser(values.email, values.password);
        if (errors !== null) {
            setErrors(errors);
            setSubmitting(false);

            return;
        }

        setSubmitting(false);
        props.onUserRegister(profile!);
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

export const RegisterFormContainer = withFormik(config)(Register);
