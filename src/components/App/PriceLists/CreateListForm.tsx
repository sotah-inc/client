import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogActions } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';
import { Region, Realm } from '@app/types/global';
import { PriceListOptions } from '@app/types/price-lists';

export type StateProps = {
  currentRegion: Region | null
  currentRealm: Realm | null
};

export type DispatchProps = {
  createList: (opts: PriceListOptions) => void
};

export type OwnProps = {};

export type FormValues = {
  name: string
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

export class CreateListForm extends React.Component<Props> {
  render() {
    const {
      values,
      setFieldValue,
      isSubmitting,
      handleReset,
      handleSubmit,
      dirty,
      errors,
      touched
    } = this.props;
    const createFormField = FormFieldGenerator({ setFieldValue });

    return (
      <form onSubmit={handleSubmit}>
        {createFormField({
          fieldName: 'name',
          type: 'string',
          placeholder: '',
          getError: () => errors.name,
          getTouched: () => !!touched.name,
          getValue: () => values.name,
          autofocus: true
        })}
        <DialogActions>
          <Button
            text="Reset"
            intent={Intent.NONE}
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          />
          <Button
            type="submit"
            text="Start List"
            intent={Intent.PRIMARY}
            icon="edit"
            disabled={isSubmitting}
          />
        </DialogActions>
      </form>
    );
  }
}
