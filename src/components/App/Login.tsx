import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { Profile } from 'types/global';
import { DialogBody, DialogActions } from '../util';
import { Generator as FormFieldGenerator } from '../util/FormField';

export type StateProps = {
  isLoggedIn: boolean
};

export type DispatchProps = {
  onUserLogin: (payload: Profile) => void
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

export class Login extends React.Component<Props> {
  state: State = {
    isDialogOpen: false
  };

  componentDidUpdate() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      this.setState({ isDialogOpen: false });
    }
  }

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
            type: 'email',
            placeholder: 'test@example.com',
            getError: () => errors.email,
            getTouched: () => !!touched.email,
            getValue: () => values.email
          })}
          {createFormField({
            fieldName: 'password',
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
            text="Login"
            intent={Intent.PRIMARY}
            icon="edit"
            disabled={isSubmitting}
          />
        </DialogActions>
      </form>
    );
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  render() {
    return (
      <>
        <Button onClick={() => this.toggleDialog()} type="button" icon="log-in" text="Login" />
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="Login"
          icon="manually-entered-data"
        >
          {this.renderForm()}
        </Dialog>
      </>
    );
  }
}
