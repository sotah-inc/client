import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues } from '../../components/App/Register';
import Register from '../../containers/App/Register';
import { registerUser } from '../../api';

interface FormProps {}

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
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    const res = await registerUser(values.email, values.password);
    if (res.errors !== null) {
      setErrors(res.errors);

      return;
    }

    console.log(res.user);
    setSubmitting(false);
  }
};

export default withFormik(config)(Register);
