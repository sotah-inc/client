import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { CreateEntryForm, IFormValues } from "@app/components/App/PriceLists/util/CreateEntryForm";
import { Item } from "@app/types/global";
import { IPricelistEntry } from "@app/types/price-lists";
import { PriceListRules } from "@app/validator-rules";

interface IFormProps {
    onComplete: (entry: IPricelistEntry, item: Item) => void;
    isSubmitDisabled?: boolean;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
        setSubmitting(false);
        resetForm();
        props.onComplete({ item_id: values.item!.id, quantity_modifier: values.quantity }, values.item!);
    },
    mapPropsToValues: (_: IFormProps) => {
        return {
            item: null,
            quantity: 1,
        };
    },
    validationSchema: Yup.object().shape({
        item: PriceListRules.item,
        quantity: PriceListRules.quantity,
    }),
};

export const CreateEntryFormFormContainer = withFormik(config)(CreateEntryForm);
