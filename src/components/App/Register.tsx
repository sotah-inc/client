import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogBody } from '../util/DialogBody';
import { DialogActions } from '../util/DialogActions';
import { Generator as FormFieldGenerator } from '../util/FormField';
import { Profile } from '../../types';

export type StateProps = {
  isRegistered: boolean
};

export type DispatchProps = {
  onUserRegister: (payload: Profile) => void
};

export type OwnProps = {};

export type FormValues = {
  email: string
  password: string
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class Register extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false
  };

  renderForm() {
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

  isDialogOpen(): boolean {
    return this.state.isDialogOpen && !this.props.isRegistered;
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  render() {
    return (
      <>
        <Button onClick={() => this.toggleDialog()} text="Register" icon="user" />
        <Dialog
          isOpen={this.isDialogOpen()}
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
