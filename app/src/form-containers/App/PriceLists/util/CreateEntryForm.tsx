import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, CreateEntryForm } from '@app/components/App/PriceLists/util/CreateEntryForm';
import { PriceListRules } from '@app/validator-rules';
import { Item } from '@app/types/global';
import { PricelistEntry } from '@app/types/price-lists';

interface FormProps {
  onComplete: (entry: PricelistEntry, item: Item) => void;
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
    props.onComplete(
      { item_id: values.item!.id, quantity_modifier: values.quantity },
      values.item!
    );
  }
};

export default withFormik(config)(CreateEntryForm);
