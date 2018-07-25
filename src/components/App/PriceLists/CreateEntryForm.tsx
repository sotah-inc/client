import * as React from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { FormikProps } from 'formik';

import { Item } from '@app/types/global';
import { PricelistEntry } from '@app/types/price-lists';
import { DialogBody, DialogActions, ItemInput } from '@app/components/util';
import { Generator as FormFieldGenerator } from '@app/components/util/FormField';
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from '@app/util';

import './CreateEntryForm.scss';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  onComplete: (entry: PricelistEntry, item: Item) => void
};

export type FormValues = {
  quantity: number
  item: Item | null
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

export class CreateEntryForm extends React.Component<Props> {
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

  render() {
    const {
      values,
      setFieldValue,
      isSubmitting,
      handleReset,
      handleSubmit,
      dirty,
      errors,
      touched,
      children
    } = this.props;
    const createFormField = FormFieldGenerator({ setFieldValue });

    const itemIntent = errors.item && touched.item ? Intent.DANGER : Intent.NONE;

    return (
      <form onSubmit={handleSubmit}>
        <DialogBody>
          {children}
          <div className="pure-g">
            <div className="pure-u-1-2">
              <div style={{paddingRight: '5px'}}>
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
            </div>
            <div className="pure-u-1-2">
              <div style={{paddingLeft: '5px'}}>
                <FormGroup
                  label="Selected item"
                  intent={itemIntent}
                >
                  {this.renderSelectedItem(values.item)}
                </FormGroup>
              </div>
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
}
