import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IItem, ItemId } from "@app/api-types/item";
import { BulkEntryForm, IFormValues } from "@app/components/App/Data/PriceLists/util/BulkEntryForm";
import { PriceListRules } from "@app/validator-rules";

interface IFormProps {
    onComplete: () => void;
    onItemSelect?: (item: IItem) => void;

    isSubmitDisabled?: boolean;
    externalItemError?: string;
    itemIdBlacklist?: ItemId[];
    leftChildren?: React.ReactNode;
    entriesTable: React.ReactNode;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (_values, { setSubmitting, resetForm, props }) => {
        setSubmitting(false);
        resetForm();
        props.onComplete();
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

export const BulkEntryFormFormContainer = withFormik(config)(BulkEntryForm);
