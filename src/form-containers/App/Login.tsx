import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, Login } from '../../components/App/Login';
import { loginUser } from '../../api';
import { Profile } from '../../types';

interface FormProps {
  onUserLogin: (payload: Profile) => void;
  isLoggedIn: boolean;
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
    const { profile, errors } = await loginUser(values.email, values.password);
    if (errors !== null) {
      setErrors(errors);
      setSubmitting(false);

      return;
    }

    setSubmitting(false);
    props.onUserLogin(profile!);
  }
};

export default withFormik(config)(Login);
