import * as React from 'react';
import { Button, NonIdealState, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { PriceList } from '@app/types/price-lists';
import { DialogBody, DialogActions } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';

export type StateProps = {
};

export type DispatchProps = {
};

export type OwnProps = {
  list: PriceList
};

export type FormValues = {
  quantity: number
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceListPanel extends React.Component<Props, State> {
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
            fieldName: 'quantity',
            type: 'number',
            placeholder: '-1',
            getError: () => errors.quantity,
            getTouched: () => !!touched.quantity,
            getValue: () => values.quantity.toString(),
            autofocus: true
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
            text="Add Entry"
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

  renderEntries() {
    const { entries } = this.props.list;
    if (entries.length === 0) {
      return (
        <NonIdealState
          title="No entries"
          description="You have no items to check."
          visual="list"
          action={<Button className="pt-fill" icon="plus" onClick={() => this.toggleDialog()}>Add List</Button>}
        />
      );
    }

    return (
      <p>Hello, world!</p>
    );
  }

  render() {
    return (
      <>
        {this.renderEntries()}
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Entry"
          icon="manually-entered-data"
        >
          {this.renderForm()}
        </Dialog>
      </>
    );
  }
}