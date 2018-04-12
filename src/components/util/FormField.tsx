import * as React from 'react';
import { FormGroup, Intent, InputGroup } from '@blueprintjs/core';

const capitalize = (v: string) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`;

type GeneratorOptions = {
  setFieldValue: (key: string, value: string) => void
};

type PropsOptions = {
  fieldName: string
  helperText?: string
  label?: string
  type?: string
  placeholder?: string
  getError: () => string
  getValue: () => string
  getTouched: () => boolean
};

type Props = Readonly<GeneratorOptions & PropsOptions>;

type FormFieldType = React.SFC<Props>;

export const FormField: FormFieldType = (props: Props) => {
  const { setFieldValue, fieldName, helperText, label, type, placeholder, getError, getValue, getTouched } = props;
  const error = getError();
  const isTouched = getTouched();
  const intent = error && isTouched ? Intent.DANGER : Intent.NONE;

  return (
    <FormGroup
      helperText={error ? error : helperText}
      label={label || capitalize(fieldName)}
      labelFor={fieldName}
      requiredLabel={true}
      intent={intent}
    >
      <InputGroup
        intent={intent}
        type={type}
        placeholder={placeholder}
        value={getValue()}
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
  const { setFieldValue } = opts;
  return (propsOpts: PropsOptions) => {
    const { fieldName, helperText, label, type, placeholder, getError, getTouched, getValue } = propsOpts;
    return (
      <FormField
        setFieldValue={setFieldValue}
        fieldName={fieldName}
        helperText={helperText}
        label={label}
        type={type}
        placeholder={placeholder}
        getError={getError}
        getTouched={getTouched}
        getValue={getValue}
      />
    );
  };
};
