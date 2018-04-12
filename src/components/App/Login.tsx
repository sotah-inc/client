import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';

import { DialogBody, DialogActions } from '../util';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {};

export type FormValues = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class Login extends React.Component<Props> {
  state: State = {
    isDialogOpen: false
  };

  renderForm() {
    return (
      <form>
        <DialogBody>
          <p>wew</p>
        </DialogBody>
        <DialogActions>
          <Button
            text="Reset"
            intent={Intent.NONE}
          />
          <Button
            type="submit"
            text="Login"
            intent={Intent.PRIMARY}
            icon="edit"
          />
        </DialogActions>
      </form>
    );
  }

  isDialogOpen(): boolean {
    return this.state.isDialogOpen;
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  render() {
    return (
      <>
        <Button onClick={() => this.toggleDialog()} type="button" icon="log-in" text="Login" />
        <Dialog
          isOpen={this.isDialogOpen()}
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
