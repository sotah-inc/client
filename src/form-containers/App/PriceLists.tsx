import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceLists } from '@app/components/App/PriceLists';
import { PriceListRules } from '@app/validator-rules';
import { PriceList } from '@app/types/price-lists';

interface FormProps {
  lists: PriceList[];
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {
      itemId: -1,
      quantity: -1
    };
  },
  validationSchema: Yup.object().shape({
    itemId: PriceListRules.itemId,
    quantity: PriceListRules.quantity
  }),
  handleSubmit: async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }
};

export default withFormik(config)(PriceLists);
