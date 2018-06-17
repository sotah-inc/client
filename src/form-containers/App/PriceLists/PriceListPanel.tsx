import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceListPanel } from '@app/components/App/PriceLists/PriceListPanel';
import { PriceListRules } from '@app/validator-rules';
import { PriceList } from '@app/types/price-lists';

interface FormProps {
  list: PriceList;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {
      quantity: -1
    };
  },
  validationSchema: Yup.object().shape({
    quantity: PriceListRules.quantity
  }),
  handleSubmit: async (_values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    resetForm();
    console.log('handleSubmit()');
  }
};

export default withFormik(config)(PriceListPanel);
