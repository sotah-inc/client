import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';

import { FormValues, CreateListForm } from '@app/components/App/PriceLists/CreateListForm';
import { PriceListRules } from '@app/validator-rules';
import { Region, Realm } from '@app/types/global';
import { PriceListOpts } from '@app/types/price-lists';

interface FormProps {
  createList: (opts: PriceListOpts) => void;
  currentRegion: Region | null;
  currentRealm: Realm | null;
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
    props.createList({
      name: values.name,
      region: props.currentRegion!,
      realm: props.currentRealm!
    });
  }
};

export default withFormik(config)(CreateListForm);
