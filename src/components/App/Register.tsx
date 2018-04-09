import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogBody } from '../util/DialogBody';
import { DialogActions } from '../util/DialogActions';
import { Generator as FormFieldGenerator } from '../util/FormField';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {};

export type FormValues = {
  email: string
  password: string
};

type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isOpen: boolean
}>;

export class Register extends React.Component<Props, State> {
  state: State = {
    isOpen: true
  };

  renderForm() {
    const { values, setFieldValue, isSubmitting, handleReset, handleSubmit, dirty, errors, touched } = this.props;
    const createFormField = FormFieldGenerator({ setFieldValue });

    return (
      <form onSubmit={handleSubmit}>
        <DialogBody>
          {createFormField({
            fieldName: 'email',
            helperText: 'For communication',
            type: 'email',
            placeholder: 'test@example.com',
            getError: () => errors.email,
            getTouched: () => !!touched.email,
            getValue: () => values.email
          })}
          {createFormField({
            fieldName: 'password',
            helperText: 'For login',
            type: 'password',
            getError: () => errors.password,
            getTouched: () => !!touched.password,
            getValue: () => values.password
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
            text="Register"
            intent={Intent.PRIMARY}
            icon="edit"
            disabled={isSubmitting}
          />
        </DialogActions>
      </form>
    );
  }

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <>
        <Button onClick={() => this.toggleDialog()} text="Register" icon="user" />
        <Dialog
          isOpen={this.state.isOpen}
          onClose={() => this.toggleDialog()}
          title="Register"
          icon="manually-entered-data"
        >
          {this.renderForm()}
        </Dialog>
      </>
    );
  }
}
