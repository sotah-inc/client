import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogActions, DialogBody } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  onComplete: (name: string) => void
};

export type FormValues = {
  name: string
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

export class ListForm extends React.Component<Props> {
  render() {
    const {
      values,
      setFieldValue,
      isSubmitting,
      handleReset,
      handleSubmit,
      dirty,
      errors,
      touched,
      children
    } = this.props;
    const createFormField = FormFieldGenerator({ setFieldValue });

    return (
      <form onSubmit={handleSubmit}>
        <DialogBody>
          {children}
          {createFormField({
            fieldName: 'name',
            type: 'string',
            placeholder: '',
            getError: () => errors.name,
            getTouched: () => !!touched.name,
            getValue: () => values.name,
            autofocus: true
          })}
        </DialogBody>
        <DialogActions>
          <Button
            text="Reset"
            intent={Intent.NONE}
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          />
          <Button
            type="submit"
            text="Next"
            intent={Intent.PRIMARY}
            icon="caret-right"
            disabled={isSubmitting}
          />
        </DialogActions>
      </form>
    );
  }
}
