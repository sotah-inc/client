import { IconName } from "@blueprintjs/icons";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";

import { IFormValues, ListForm } from "@app/components/App/Data/PriceLists/util/ListForm";
import { PriceListRules } from "@app/validator-rules";

interface IFormProps {
    defaultName?: string;
    defaultSlug?: string;
    onComplete: (name: string, slug: string) => void;
    submitIcon: IconName;
    submitText: string;
}

const config: WithFormikConfig<IFormProps, IFormValues> = {
    handleSubmit: async (values, { setSubmitting, props }) => {
        setSubmitting(false);
        props.onComplete(values.name, values.slug);
    },
    mapPropsToValues: (props: IFormProps) => {
        return {
            name: props.defaultName ? props.defaultName : "",
            slug: props.defaultSlug ? props.defaultSlug : "",
        };
    },
    validationSchema: Yup.object().shape({
        name: PriceListRules.name,
        slug: PriceListRules.slug,
    }),
};

export const ListFormFormContainer = withFormik(config)(ListForm);
