import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, ListForm } from '@app/components/App/PriceLists/util/ListForm';
import { PriceListRules } from '@app/validator-rules';

interface FormProps {
  onComplete: (name: string) => void;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {
      name: ''
    };
  },
  validationSchema: Yup.object().shape({
    name: PriceListRules.name
  }),
  handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
    setSubmitting(false);
    resetForm();
    props.onComplete(values.name);
  }
};

export default withFormik(config)(ListForm);
