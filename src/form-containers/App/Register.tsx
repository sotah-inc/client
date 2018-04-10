import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, Register } from '../../components/App/Register';
import { registerUser } from '../../api';
import { User } from '../../types';

interface FormProps {
  onUserRegister: (user: User) => void;
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
    const res = await registerUser(values.email, values.password);
    if (res.errors !== null) {
      setErrors(res.errors);

      return;
    }

    setSubmitting(false);
    props.onUserRegister(res.user!);
  }
};

export default withFormik(config)(Register);
