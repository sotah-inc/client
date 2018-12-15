import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IPricelistEntryJson } from "@app/api-types/entities";
import { IItem, ItemId } from "@app/api-types/item";
import { CreateEntryForm, IFormValues } from "@app/components/App/Data/PriceLists/util/CreateEntryForm";
import { PriceListRules } from "@app/validator-rules";

interface IFormProps {
    onComplete: (entry: IPricelistEntryJson, item: IItem) => void;
    onItemSelect?: (item: IItem) => void;

    isSubmitDisabled?: boolean;
    externalItemError?: string;
    itemIdBlacklist?: ItemId[];
    leftChildren?: React.ReactNode;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
        setSubmitting(false);
        resetForm();
        props.onComplete({ id: -1, item_id: values.item!.id, quantity_modifier: values.quantity }, values.item!);
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
