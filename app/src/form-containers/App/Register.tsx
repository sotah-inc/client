import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, Register } from '@app/components/App/Register';
import { registerUser } from '@app/api/user';
import { IProfile } from '@app/types/global';
import { UserRules } from '@app/validator-rules';

interface FormProps {
  onUserRegister: (payload: IProfile) => void;
  isRegistered: boolean;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {
      email: '',
      password: ''
    };
  },
  validationSchema: Yup.object().shape({
    email: UserRules.email,
    password: UserRules.password
  }),
  handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
    const { profile, errors } = await registerUser(values.email, values.password);
    if (errors !== null) {
      setErrors(errors);
      setSubmitting(false);

      return;
    }

    setSubmitting(false);
    props.onUserRegister(profile!);
  }
};

export default withFormik(config)(Register);
