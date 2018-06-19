import * as React from 'react';
import { Tab, Tabs, Button, NonIdealState, Dialog, Intent } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { PriceList, ListCreateLevel } from '@app/types/price-lists';
import PriceListPanel from '@app/containers/App/PriceLists/PriceListPanel';
import { DialogBody, DialogActions } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';
import { priceListEntryTabId } from '@app/util';

export type StateProps = {
  lists: PriceList[]
  listCreateLevel: ListCreateLevel
  selectedList: PriceList | null
};

export type DispatchProps = {
  onSubmit: (name: string) => void
  changeCreateLevel: (createLevel: ListCreateLevel) => void
  changeSelectedList: (list: PriceList) => void
};

export type OwnProps = {};

export type FormValues = {
  name: string
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceLists extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false
  };

  componentDidUpdate(prevProps: Props) {
    const { listCreateLevel } = this.props;

    if (listCreateLevel !== prevProps.listCreateLevel) {
      switch (listCreateLevel) {
        case ListCreateLevel.success:
          this.setState({ isDialogOpen: false });
          this.props.changeCreateLevel(ListCreateLevel.initial);

          break;
        default:
          break;
      }
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
        id={priceListEntryTabId(list)}
        title={list.name}
        panel={<PriceListPanel list={list} />}
      />
    );
  }

  onTabChange(id: React.ReactText) {
    const list = this.props.lists.reduce(
      (result, v) => {
        if (result !== null) {
          return result;
        }

        if (priceListEntryTabId(v) === id.toString()) {
          return v;
        }

        return null;
      },
      null
    );

    if (list === null) {
      return;
    }

    this.props.changeSelectedList(list);
  }

  renderTabs() {
    const { lists, selectedList } = this.props;

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
      <>
        <Button
          icon="plus"
          style={{ marginBottom: '10px' }}
          onClick={() => this.toggleDialog()}
          text={'Add List'}
        />
        <Tabs
          id="price-lists"
          className="price-lists"
          selectedTabId={selectedList ? `tab-${selectedList.id}` : ''}
          onChange={(id) => this.onTabChange(id)}
          vertical={true}
        >
          {lists.map((v, i) => this.renderTab(v, i))}
        </Tabs>
      </>
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