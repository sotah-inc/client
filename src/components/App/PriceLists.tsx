import * as React from 'react';
import { Tab, Tabs, Button, NonIdealState, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { PriceList, OnCreateLevel } from '@app/types/price-lists';
import PriceListPanel from '@app/form-containers/App/PriceLists/PriceListPanel';
import { DialogBody, DialogActions } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';

export type StateProps = {
  lists: PriceList[]
  onCreateLevel: OnCreateLevel
};

export type DispatchProps = {
  onSubmit: (name: string) => void
};

export type OwnProps = {};

export type FormValues = {
  name: string
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
  selectedTabId: string
}>;

export class PriceLists extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false,
    selectedTabId: ''
  };

  componentDidUpdate(prevProps: Props) {
    const { onCreateLevel, lists } = this.props;

    if (onCreateLevel !== prevProps.onCreateLevel) {
      switch (onCreateLevel) {
        case OnCreateLevel.success:
          this.setState({ isDialogOpen: false });

          break;
        default:
          break;
      }
    }

    if (lists.length > prevProps.lists.length) {
      this.setState({
        selectedTabId: `list-${lists[lists.length - 1].id.toString()}`
      });
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
            fieldName: 'name',
            type: 'string',
            placeholder: '',
            getError: () => errors.name,
            getTouched: () => !!touched.name,
            getValue: () => values.name,
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
            text="Start List"
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
        panel={<PriceListPanel list={list} />}
      />
    );
  }

  onTabChange(id: React.ReactText) {
    this.setState({ selectedTabId: id.toString() });
  }

  renderTabs() {
    const { lists } = this.props;

    if (lists.length === 0) {
      return (
        <div style={{ marginTop: '10px' }}>
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
      <Tabs
        id="price-lists"
        selectedTabId={this.state.selectedTabId}
        onChange={(id) => this.onTabChange(id)}
        vertical={true}
      >
        <Button
          className="pt-fill"
          icon="plus"
          style={{ marginBottom: '10px' }}
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