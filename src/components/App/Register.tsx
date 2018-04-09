import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogBody } from '../util/DialogBody';
import { DialogActions } from '../util/DialogActions';
import { Generator } from '../util/FormField';

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
    const generator = Generator({ errors, touched, values, setFieldValue });

    return (
      <form onSubmit={handleSubmit}>
        <DialogBody>
          {generator({
            type: 'email',
            fieldName: 'email',
            helperText: 'For communication',
            label: 'Email',
            placeholder: 'test@example.com'
          })}
          {generator({
            type: 'password',
            fieldName: 'password',
            helperText: 'For login',
            label: 'Password',
            placeholder: ''
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
