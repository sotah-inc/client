import * as React from 'react';
import { Dialog } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListForm';
import ActionBar from '@app/containers/App/PriceLists/ActionBar';
import Listing from '@app/containers/App/PriceLists/Listing';

import './PriceLists.scss';

export type StateProps = {
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  toggleDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  render() {
    const { isAddListDialogOpen } = this.props;

    return (
      <>
        <Dialog
          isOpen={isAddListDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Price List"
          icon="manually-entered-data"
        >
          <CreateListForm />
        </Dialog>
        <ActionBar />
        <Listing />
      </>
    );
  }
}
