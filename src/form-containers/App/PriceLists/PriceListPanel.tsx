import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, PriceListPanel } from '@app/components/App/PriceLists/PriceListPanel';
import { PriceListRules } from '@app/validator-rules';
import { PriceList, PriceListEntry, EntryCreateLevel } from '@app/types/price-lists';

interface FormProps {
  list: PriceList;
  entryCreateLevel: EntryCreateLevel;

  onSubmit: (entry: PriceListEntry) => void;
  changeCreateLevel: (level: EntryCreateLevel) => void;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (_: FormProps) => {
    return {
      quantity: -1,
      item: null
    };
  },
  validationSchema: Yup.object().shape({
    quantity: PriceListRules.quantity,
    item: PriceListRules.item
  }),
  handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
    setSubmitting(false);
    resetForm();
    props.onSubmit({
      item: values.item!,
      quantity: values.quantity
    });
  }
};

export default withFormik(config)(PriceListPanel);
