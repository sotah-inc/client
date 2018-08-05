import { withFormik, WithFormikConfig } from 'formik';
import * as Yup from 'yup';
import { IconName } from '@blueprintjs/icons';

import { FormValues, ListForm } from '@app/components/App/PriceLists/util/ListForm';
import { PriceListRules } from '@app/validator-rules';

interface FormProps {
  defaultName?: string;
  onComplete: (name: string) => void;
  submitIcon: IconName;
  submitText: string;
}

const config: WithFormikConfig<FormProps, FormValues> = {
  mapPropsToValues: (props: FormProps) => {
    return {
      name: props.defaultName ? props.defaultName : ''
    };
  },
  validationSchema: Yup.object().shape({
    name: PriceListRules.name
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(false);
    props.onComplete(values.name);
  }
};

export default withFormik(config)(ListForm);
