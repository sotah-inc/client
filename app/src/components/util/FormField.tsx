import * as React from "react";

import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";

const capitalize = (v: string) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`;

interface IGeneratorOptions {
    setFieldValue: (key: string, value: string) => void;
}

interface IPropsOptions {
    fieldName: string;
    helperText?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    autofocus?: boolean;
    getError: () => string;
    getValue: () => string;
    getTouched: () => boolean;
}

type Props = Readonly<IGeneratorOptions & IPropsOptions>;

type FormFieldType = React.SFC<Props>;

const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return (props: Props) => {
        const { setFieldValue, fieldName } = props;
        setFieldValue(fieldName, e.target.value);
    };
};

export const FormField: FormFieldType = (props: Props) => {
    const { fieldName, helperText, label, type, placeholder, getError, getValue, getTouched, autofocus } = props;
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
                onChange={onInputChange}
                autoFocus={autofocus}
            />
        </FormGroup>
    );
};

type GeneratorInterface = (opts: IGeneratorOptions) => GeneratorFunc;

type GeneratorFunc = (propsOpts: IPropsOptions) => React.ReactNode;

export const Generator: GeneratorInterface = (opts: IGeneratorOptions) => {
    const { setFieldValue } = opts;
    return (propsOpts: IPropsOptions) => {
        const {
            fieldName,
            helperText,
            label,
            type,
            placeholder,
            getError,
            getTouched,
            getValue,
            autofocus,
        } = propsOpts;
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
                autofocus={autofocus}
            />
        );
    };
};
