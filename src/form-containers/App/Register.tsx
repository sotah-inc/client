import { withFormik } from 'formik';

import { FormValues } from '../../components/App/Register';
import Register from '../../containers/App/Register';

export default withFormik<{}, FormValues>({
  handleSubmit: (values) => {
    console.log(values);
  }
})(Register);
