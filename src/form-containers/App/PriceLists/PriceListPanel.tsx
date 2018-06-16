import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceListPanel } from '@app/components/App/PriceLists/PriceListPanel';
import { PriceList } from '@app/types/price-lists';

interface FormProps {
  list: PriceList;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {};
  },
  validationSchema: Yup.object().shape({
  }),
  handleSubmit: async () => {
    console.log('handleSubmit()');
  }
};

export default withFormik(config)(PriceListPanel);
