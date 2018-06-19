import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceLists } from '@app/components/App/PriceLists';
import { PriceListRules } from '@app/validator-rules';
import { PriceList, ListCreateLevel } from '@app/types/price-lists';

interface FormProps {
  lists: PriceList[];
  listCreateLevel: ListCreateLevel;
  selectedList: PriceList | null;

  onSubmit: (name: string) => void;
  changeCreateLevel: (createLevel: ListCreateLevel) => void;
  changeSelectedList: (list: PriceList) => void;
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
  handleSubmit: async (values, { setSubmitting, props, resetForm }) => {
    setSubmitting(false);
    resetForm();
    props.onSubmit(values.name);
  }
};

export default withFormik(config)(PriceLists);
