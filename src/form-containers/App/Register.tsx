import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, Register } from '../../components/App/Register';
import { registerUser } from '../../api';
import { Profile } from '../../types';

interface FormProps {
  onUserRegister: (payload: Profile) => void;
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
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string().required('Password is required!')
  }),
  handleSubmit: async (values, { setSubmitting, setErrors, props }) => {
    const { profile, errors } = await registerUser(values.email, values.password);
    if (errors !== null) {
      setErrors(errors);

      return;
    }

    setSubmitting(false);
    props.onUserRegister(profile!);
  }
};

export default withFormik(config)(Register);
