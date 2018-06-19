import * as React from 'react';
import { Button, NonIdealState, Dialog, Intent, FormGroup } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { Item } from '@app/types/global';
import { PriceList, PriceListEntry, EntryCreateLevel } from '@app/types/price-lists';
import { DialogBody, DialogActions, ItemInput } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from '@app/util';

export type StateProps = {
  entryCreateLevel: EntryCreateLevel
};

export type DispatchProps = {
  onSubmit: (entry: PriceListEntry) => void
  changeCreateLevel: (createLevel: EntryCreateLevel) => void
};

export type OwnProps = {
  list: PriceList
};

export type FormValues = {
  quantity: number
  item: Item | null
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceListPanel extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false
  };

  componentDidUpdate() {
    const { entryCreateLevel, changeCreateLevel } = this.props;

    switch (entryCreateLevel) {
      case EntryCreateLevel.success:
        this.setState({ isDialogOpen: false });
        changeCreateLevel(EntryCreateLevel.initial);

        break;
      default:
        break;
    }
  }

  renderSelectedItem(item: Item | null) {
    if (item === null) {
      return (
        <p><em>No item selected.</em></p>
      );
    }

    const className = qualityToColorClass(item.quality);
    const textValue = getItemTextValue(item);
    const itemIcon = getItemIconUrl(item);
    if (itemIcon === null) {
      return (
        <p className={className}>{textValue}</p>
      );
    }

    return (
      <h5 className={`${className} new-entry-item`}>
        <img src={itemIcon} /> {textValue}
      </h5>
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

    const itemIntent = errors.item && touched.item ? Intent.DANGER : Intent.NONE;

    return (
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <FormGroup
                helperText={errors.item}
                label="Item"
                requiredLabel={true}
                intent={itemIntent}
              >
                <ItemInput
                  onSelect={(item) => setFieldValue('item', item)}
                  autoFocus={true}
                />
              </FormGroup>
            </div>
            <div className="pure-u-1-2">
              <FormGroup
                label="Selected item"
                intent={itemIntent}
              >
                {this.renderSelectedItem(values.item)}
              </FormGroup>
            </div>
          </div>
          {createFormField({
            fieldName: 'quantity',
            type: 'number',
            placeholder: '-1',
            getError: () => errors.quantity,
            getTouched: () => !!touched.quantity,
            getValue: () => values.quantity.toString()
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
      <p>Hello, world! {entries.length}</p>
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
          canOutsideClickClose={false}
        >
          {this.renderForm()}
        </Dialog>
      </>
    );
  }
}