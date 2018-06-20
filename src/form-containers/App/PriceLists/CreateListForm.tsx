import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, CreateListForm } from '@app/components/App/PriceLists/CreateListForm';
import { PriceListRules } from '@app/validator-rules';

interface FormProps {
  createList: (name: string) => void;
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
    props.createList(values.name);
  }
};

export default withFormik(config)(CreateListForm);
