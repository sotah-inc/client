import { IconName } from "@blueprintjs/icons";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IFormValues, ListForm } from "@app/components/App/Data/PriceLists/util/ListForm";
import { PriceListRules } from "@app/validator-rules";

interface IFormProps {
    defaultName?: string;
    onComplete: (name: string) => void;
    submitIcon: IconName;
    submitText: string;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, props }) => {
        setSubmitting(false);
        props.onComplete(values.name);
    },
    mapPropsToValues: (props: IFormProps) => {
        return {
            name: props.defaultName ? props.defaultName : "",
        };
    },
    validationSchema: Yup.object().shape({
        name: PriceListRules.name,
    }),
};

export const ListFormFormContainer = withFormik(config)(ListForm);
