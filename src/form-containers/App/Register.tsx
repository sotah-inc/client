import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues } from '../../components/App/Register';
import Register from '../../containers/App/Register';

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
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }
};

export default withFormik(config)(Register);
