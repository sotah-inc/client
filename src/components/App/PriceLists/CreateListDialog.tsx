import * as React from 'react';
import { Dialog, Breadcrumb, Icon, Intent } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListDialog/CreateListForm';

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

  renderNav() {
    return (
      <ul className="pt-breadcrumbs">
        <Breadcrumb
          text="Define List"
          icon={<Icon icon="caret-right" />}
          href="#"
          intent={Intent.DANGER}
          onClick={() => console.log('list')}
        />
      </ul>
    );
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
        <CreateListForm>
          {this.renderNav()}
        </CreateListForm>
      </Dialog>
    );
  }
}
