import * as React from 'react';
import { Tab, Tabs, Button, NonIdealState, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { ItemId } from '@app/types/global';
import { PriceList } from '@app/types/price-lists';
import { DialogBody, DialogActions } from '../util';
import { Generator as FormFieldGenerator } from '../util/FormField';

export type StateProps = {
  lists: PriceList[]
};

export type DispatchProps = {};

export type OwnProps = {};

export type FormValues = {
  quantity: number
  itemId: ItemId
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceLists extends React.Component<Props> {
  state: State = {
    isDialogOpen: false
  };

  renderPanel(list: PriceList) {
    return (
      <p>Hello, world!</p>
    );
  }

  renderTab(list: PriceList, index: number) {
    return (
      <Tab
        key={index}
        id={`list-${list.id}`}
        title={list.name}
        panel={this.renderPanel(list)}
      />
    );
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
            fieldName: 'quantity',
            type: 'number',
            placeholder: '-1',
            getError: () => errors.quantity,
            getTouched: () => !!touched.quantity,
            getValue: () => values.quantity.toString()
          })}
          {createFormField({
            fieldName: 'itemId',
            type: 'number',
            placeholder: '-1',
            getError: () => errors.itemId,
            getTouched: () => !!touched.itemId,
            getValue: () => values.itemId.toString()
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
            text="Add List"
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

  renderTabs() {
    const { lists } = this.props;

    if (lists.length === 0) {
      return (
        <div style={{marginTop: '10px'}}>
          <NonIdealState
            title="No price lists"
            description="You have no price lists."
            visual="list"
            action={<Button className="pt-fill" icon="plus" onClick={() => this.toggleDialog()}>Add List</Button>}
          />
        </div>
      );
    }

    return (
      <Tabs id="price-lists" selectedTabId="ayy" vertical={true}>
        <Button
          className="pt-fill"
          icon="plus"
          style={{marginBottom: '10px'}}
          onClick={() => this.toggleDialog()}
        >
          Add List
        </Button>
        <Tabs.Expander />
        {lists.map((v, i) => this.renderTab(v, i))}
      </Tabs>
    );
  }

  render() {
    return (
      <>
        {this.renderTabs()}
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Price List"
          icon="manually-entered-data"
        >
          {this.renderForm()}
        </Dialog>
      </>
    );
  }
}