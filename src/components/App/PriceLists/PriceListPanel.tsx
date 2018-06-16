import * as React from 'react';
import { FormikProps } from 'formik';

import { PriceList } from '@app/types/price-lists';

export type StateProps = {
};

export type DispatchProps = {
};

export type OwnProps = {
  list: PriceList
};

export type FormValues = {
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps & FormikProps<FormValues>>;

type State = Readonly<{
}>;

export class PriceListPanel extends React.Component<Props, State> {
  state: State = {
  };

  render() {
    return (
      <p>Hello, world!</p>
    );
  }
}