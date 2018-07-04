import * as React from 'react';
import { Dialog } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListForm';

export type StateProps = {
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class CreateListDialog extends React.Component<Props> {
  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }
  render() {
    const { isAddListDialogOpen } = this.props;

    return (
      <Dialog
        isOpen={isAddListDialogOpen}
        onClose={() => this.toggleListDialog()}
        title="New Price List"
        icon="manually-entered-data"
      >
        <CreateListForm />
      </Dialog>
    );
  }
}
