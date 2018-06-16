import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceLists } from '@app/components/App/PriceLists';
import { PriceListRules } from '@app/validator-rules';
import { PriceList, OnCreateLevel } from '@app/types/price-lists';

interface FormProps {
  lists: PriceList[];
  onCreateLevel: OnCreateLevel;

  onSubmit: (name: string) => void;
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
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(false);
    props.onSubmit(values.name);
  }
};

export default withFormik(config)(PriceLists);
