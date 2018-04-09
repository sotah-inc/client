import * as React from 'react';
import { FormGroup, Intent, InputGroup } from '@blueprintjs/core';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';

type GeneratorOptions = {
  errors: FormikErrors<{}>
  touched: FormikTouched<{}>
  values: FormikValues
  setFieldValue: (key: string, value: string) => void;
};

type PropsOptions = {
  fieldName: string
  helperText: string
  label: string
  type: string
  placeholder: string
};

type Props = Readonly<GeneratorOptions & PropsOptions>;

type FormFieldType = React.SFC<Props>;

export const FormField: FormFieldType = (props: Props) => {
  const { fieldName, errors, touched, helperText, label, type, placeholder, values, setFieldValue } = props;
  const error = errors[fieldName];
  const isTouched = touched[fieldName];
  const intent = error && isTouched ? Intent.DANGER : Intent.NONE;

  return (
    <FormGroup
      helperText={error ? error : helperText}
      label={label}
      labelFor={fieldName}
      requiredLabel={true}
      intent={intent}
    >
      <InputGroup
        intent={intent}
        type={type}
        placeholder={placeholder}
        value={values[fieldName]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(fieldName, e.target.value)}
      />
    </FormGroup>
  );
};

interface GeneratorInterface {
  (opts: GeneratorOptions): GeneratorFunc;
}

interface GeneratorFunc {
  (propsOpts: PropsOptions): React.ReactNode;
}

export const Generator: GeneratorInterface = (opts: GeneratorOptions) => {
  const { errors, touched, values, setFieldValue } = opts;
  return (propsOpts: PropsOptions) => {
    const { fieldName, helperText, label, placeholder, type } = propsOpts;
    return (
      <FormField
        fieldName={fieldName}
        errors={errors}
        touched={touched}
        values={values}
        setFieldValue={setFieldValue}
        helperText={helperText}
        label={label}
        type={type}
        placeholder={placeholder}
      />
    );
  };
};
