import * as React from 'react';
import { Button, Dialog, FormGroup, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { DialogBody } from '../util/DialogBody';
import { DialogActions } from '../util/DialogActions';

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
    isOpen: false
  };

  renderForm() {
    return (
      <>
        <DialogBody>
          <FormGroup
            helperText="Helper text with details..."
            label="Label A"
            labelFor="text-input"
            requiredLabel={true}
          >
            <input id="text-input" placeholder="Placeholder text" />
          </FormGroup>
        </DialogBody>
        <DialogActions>
          <Button text="Reset" intent={Intent.NONE} />
          <Button text="Register" intent={Intent.PRIMARY} icon="edit" />
        </DialogActions>
      </>
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
